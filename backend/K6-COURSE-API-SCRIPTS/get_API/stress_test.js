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
      projectID: 3689105,
      // Test runs with the same name groups test runs together.
      name: 'Course-GET-ID-BATCH-STRESS-API'
    }
  },
    stages: [
        { duration: '1m', target: 10 }, 
        { duration: '3m', target: 20 }, 
        { duration: '5m', target: 30 }, 
        { duration: '2m', target: 60 }, 
        { duration: '2m', target: 80 }, 
        { duration: '1m', target: 100 }, 
      ],
  thresholds: {
    'http_req_duration': ['p(95)<100'], 
    'http_req_failed': ['rate<0.1'], 
    //RED METHOD
    'request_rate': ['rate==1'], 
    'failure_rate': ['rate<0.1'], 
    'latency': ['p(95)<500'], 

  //  'request_count': ['count>=1', 'count<=8'], 
    'status_code': ['count>=0', 'count<=10'],
    'content_size': ['value<=785'],
    'successful_checks': ['rate>0.9'],
    'http_req_blocked': ['avg<100'],
    'http_req_connecting': ['avg<50'],
    'http_req_tls_handshaking': ['p(95)<500'],
    'http_reqs': ['count>=1', 'count<=10'],
  },
  // Enable metrics collection
  metrics: 'all',
};

export function setup() {
    const urls = [
      'http://localhost:8884/3',
      'http://localhost:8884/4',
      'http://localhost:8884/5',
      'http://localhost:8884/7',
      'http://localhost:8884/8',
      'http://localhost:8884/9',
      'http://localhost:8884/10',
      'http://localhost:8884/11',
      'http://localhost:8884/12',
      'http://localhost:8884/13',
    ];
  
    const requests = urls.map(url => ({
      method: 'GET',
      url: url,
    }));
  
    return { requests };
}

export default function (data) {
    const responses = http.batch(data.requests);
  
    if (!responses || responses.length === 0) {
      console.error('No responses received');
      return;
    }
  
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
    data.requests.forEach(request => {
        console.log(`Request ${request.url} closed`);
    });
}