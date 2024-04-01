import http from 'k6/http';
import { Counter, Rate, Trend, Gauge } from 'k6/metrics';
import { check } from 'k6';


const statusCode = new Counter('status_code');
const contentSize = new Gauge('content_size');
const successfulChecks = new Rate('successful_checks');

//RED Method
const requestRate = new Rate('request_rate');
const failureRate = new Rate('failure_rate');
const latency = new Trend('latency');

let executedRequests = [];

export let options = {
  ext: {
    loadimpact: {
      // Project: Ghibli
      projectID: 3689105,
      // Test runs with the same name groups test runs together.
      name: 'Course-GET-ID-API'
    }
  },
  thresholds: {
    'http_req_duration': ['p(95)<100'], 
    'http_req_failed': ['rate<0.1'], 
    //RED METHOD
    'request_rate': ['rate==1'], 
    'failure_rate': ['rate<0.1'], 
    'latency': ['p(95)<500'], 

    'status_code': ['count>=0', 'count<=10'],
    'content_size': ['value<=1330'],
    'successful_checks': ['rate>0.9'],
    'http_req_blocked': ['avg<100'],
    'http_req_connecting': ['avg<50'],
    'http_req_tls_handshaking': ['p(95)<500'],
    'http_reqs': ['count>=1', 'count<=10'],
  },
  metrics: 'all',
};

export function setup() {
    const urls = [
      'http://localhost:8884'
    ];
  
    const ids = [];
    const generatedRequests = [];
  
    for (let i = 0; i < 10; i++) {
      const id = Math.floor(Math.random() * 8) + 3;
      const url = urls[Math.floor(Math.random() * urls.length)];
      ids.push(id);
      generatedRequests.push({ url, id });
    }
  
    return { urls, ids, generatedRequests };
}
  

export default function (data) {
    const { generatedRequests } = data;
  
    for (const request of generatedRequests) {
      const { url, id } = request;
  
      const response = http.get(`${url}/${id}`);
  
      recordMetricsAndChecks(response);
    }
  }
  

function recordMetricsAndChecks(response) {
  const status_success = check(response, {
    'Status is 201': (r) => r.status === 201
  });
  successfulChecks.add(status_success);
  

  latency.add(response.timings.duration);
  
  failureRate.add(response.status !== 201);
  
  statusCode.add(response.status === 201);
  
  const length = response.headers['Content-Length'];
  contentSize.add(Number(length));
  
  requestRate.add(1);
}

export function handleSummary(data) {
 
}

export function teardown(data) {
  
  console.log("Executed requests during the test:");
  executedRequests.forEach(request => {
    console.log(`URL: ${request.url}, ID: ${request.id}`);
  });
}
