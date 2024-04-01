import http from 'k6/http';
import { Counter, Rate, Trend, Gauge } from 'k6/metrics';
import { check, sleep } from 'k6';

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInByb2ZpbGUiOlt7ImlkIjoyNSwidXNlcl9pZCI6MjYsImZ1bGxfbmFtZSI6Ik1ycy4gRHJldyBVcHRvbiIsInBob25lX25vIjoiMjE0LTc3NS01NTkwIiwiYXJlYV9vZl9pbnRlcmVzdHMiOiJNYXJrZXRzIiwic3RhdHVzIjoxLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0wMVQyMjozODoxMS4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMDFUMjI6Mzg6MTEuMDAwWiIsImVtYWlsX2lkIjoiQnJhbmRvbl9NYXllcnRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MTIwMTM5NDksImV4cCI6MTcxMjAxNzU0OX0.gtsVpqrzxm3kqUYgnVSXbF53yarx-6QRNAXYyEKu5ZM';

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
      name: 'Update-Customer-spike-API'
    }
  },
    
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
  const urls = Array(9).fill('http://localhost:8883/');
  const ids = [4, 3, 11, 13, 5]
  const requests = [];
  const params = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  // Generate multiple IDs and populate executedRequests array
  for (let i = 0; i < 10; i++) {
      const id = ids[Math.floor(Math.random() * ids.length)];;
      const url = urls[Math.floor(Math.random() * urls.length)];
      requests.push({
          method: 'GET',
          url: url + '/' + id,
          params: params,
      });
  }

  // Return data for the test
  return { requests };
}
  


export default function (data) {
    const { requests } = data;

    // Execute batch request
    const responses = http.batch(requests);

    // Process responses
    for (const response of responses) {
      console.log(response.body);
      console.log('*******');
        recordMetricsAndChecks(response);
        sleep(1);
    }
}
  

function recordMetricsAndChecks(response) {
  // Check if the response is successful
  const status_success = check(response, {
    'Status is 200': (r) => r.status === 200
  });
  successfulChecks.add(status_success);
  
  // Record latency
  latency.add(response.timings.duration);
  
  // Record failure rate
  failureRate.add(response.status !== 200);
  
  // Record status code count
  statusCode.add(response.status === 200);
  
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
  console.log('All Connections closed!');
    
}
