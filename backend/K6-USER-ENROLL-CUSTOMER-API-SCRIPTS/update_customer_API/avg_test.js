import http from 'k6/http';
import { Counter, Rate, Trend, Gauge } from 'k6/metrics';
import { check, sleep } from 'k6';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

faker.locale = 'en';

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
    stages: [
        { duration: '1m', target: 50 },  
        { duration: '5m', target: 50 },  
        { duration: '2m', target: 100 }, 
        { duration: '10m', target: 100 }, 
        { duration: '2m', target: 0 },    
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
    'content_size': ['value<=850'],
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
    const urls = Array(9).fill('http://localhost:8882');
    const ids = [];
    const requests = [];

    // Generate multiple URLs and IDs
    for (let i = 0; i < 10; i++) {
        const id = Math.floor(Math.random() * 40) + 29;
        const url = urls[Math.floor(Math.random() * urls.length)];
        ids.push(id);
        requests.push({
            method: 'PUT',
            url: `${url}/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: faker.name.findName(),
                phone_no: faker.phone.phoneNumber(),
                area_of_interests: faker.random.word(), // Generates a random string of length 100
            }),
        });
    }

    // Return data for the test
    return { requests };
}

export default function (data) {
    // Execute batch request
    const responses = http.batch(data.requests);

    // Process responses
    for (const response of responses) {
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
  // Log executed requests
  console.log("Requests closed!");
}
