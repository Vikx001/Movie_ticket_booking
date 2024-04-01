import http from 'k6/http';
import { Counter, Rate, Trend, Gauge } from 'k6/metrics';
import { check, sleep } from 'k6';

//const requestCount = new Counter('request_count');
const statusCode = new Counter('status_code');
const contentSize = new Gauge('content_size');
//const dataSent = new Counter('data_sent'); 
//const dataReceived = new Counter('data_received');
const successfulChecks = new Rate('successful_checks');

//RED Method
const requestRate = new Rate('request_rate');
const failureRate = new Rate('failure_rate');
const latency = new Trend('latency');


export let options = {
  ext: {
    loadimpact: {
      // Project: Ghibli
      projectID: 3689160,
      // Test runs with the same name groups test runs together.
      name: 'Course-DELETE-soak-API'
    }
  },
    stages: [
        { duration: '5m', target: 100 }, 
        { duration: '30m', target: 100 }, 
        { duration: '5m', target: 0 }, 
      ],
      thresholds: {
        'http_req_duration': ['p(95)<100'], 
        'http_req_failed': ['rate<0.1'], 
        //RED METHOD
        'request_rate': ['rate==1'], 
        'failure_rate': ['rate<0.1'], 
        'latency': ['p(95)<20000'], 
    
      //  'request_count': ['count>=1', 'count<=8'], 
        'status_code': ['count>=0', 'count<=50000'],
        'content_size': ['value<=996'],
        'successful_checks': ['rate>0.9'],
        'http_req_blocked': ['avg<100'],
        'http_req_connecting': ['avg<50'],
        'http_req_tls_handshaking': ['p(95)<500'],
        'http_reqs': ['count>=1', 'count<=50000'],
      },
  // Enable metrics collection
  metrics: 'all',
};

export function setup() {
    const urls = ['http://localhost:8884'];
    const ids = Array.from({ length: 10 }, () => Math.floor(Math.random() * 8) + 3);
    const generatedRequests = urls.flatMap(url => ids.map(id => ({ url, id })));
    return { urls, ids, generatedRequests };
}

export default function (data) {
    const { generatedRequests } = data;
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const requests = generatedRequests.map(request => ({
        method: 'DELETE',
        url: `${request.url}/${request.id}`,
        params: params,
    }));

    const responses = http.batch(requests);

    // Record metrics and checks for each response
    responses.forEach(response => {
        recordMetricsAndChecks(response);
        sleep(1);
    });
}
  

function recordMetricsAndChecks(response) {
  // Check if the response is successful
  const status_success = check(response, {
    'Status is 201': (r) => r.status === 201
  });
  successfulChecks.add(status_success);
  
  // Record latency
  latency.add(response.timings.duration);
  
  // Record failure rate
  failureRate.add(response.status !== 201);
  
  // Record status code count
  statusCode.add(response.status === 201);
  
  // Record content size
  const length = response.headers['Content-Length'];
  contentSize.add(Number(length));
  
  // Record data received
  //dataReceived.add(response.body ? response.body.length : 0);
  
  // Record request count
  requestRate.add(1);
}

export function handleSummary(data) {
 
}

export function teardown(data) {
  // Log executed requests
  console.log("All connections closed!");
}
