import http from 'k6/http';
import { Counter, Rate, Trend, Gauge } from 'k6/metrics';
import { check } from 'k6';

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

let executedRequests = [];

export let options = {
  ext: {
    loadimpact: {
      // Project: Ghibli
      projectID: 3689105,
      // Test runs with the same name groups test runs together.
      name: 'Course-EDIT-API'
    }
  },
  thresholds: {
    'http_req_duration': ['p(95)<100'], 
    'http_req_failed': ['rate<0.1'], 
    // RED METHOD
    'request_rate': ['rate==1'], 
    'failure_rate': ['rate<0.1'], 
    'latency': ['p(95)<500'], 

    //'request_count': ['count>=10', 'count<=80'], 
    'status_code': ['count>=0', 'count<=100'],
    'content_size': ['value<=850'],
    'successful_checks': ['rate>0.9'],
    'http_req_blocked': ['avg<100'],
    'http_req_connecting': ['avg<50'],
    'http_req_tls_handshaking': ['p(95)<500'],
    'http_reqs': ['count>=10', 'count<=100'],
},

  // Enable metrics collection
  metrics: 'all',
};

export function setup() {
    const urls = [
      'http://localhost:8884'
    ];
  
    const ids = [];
    const generatedRequests = [];
  
    // Generate multiple IDs and populate executedRequests array
    for (let i = 0; i < 10; i++) {
      const id = Math.floor(Math.random() * 8) + 3;
      const url = urls[Math.floor(Math.random() * urls.length)];
      ids.push(id);
      generatedRequests.push({ url, id });
    }

  
    // Return data for the test
    return { urls, ids, generatedRequests };
}
  
function generateRandomData(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = '';
    for (let i = 0; i < length; i++) {
        data += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return data;
}

export default function (data) {
    const { generatedRequests } = data;
    

    const payload = {
        title: generateRandomData(10), // Generates a random string of length 10
        description: generateRandomData(50), // Generates a random string of length 50
        course_content: generateRandomData(100), // Generates a random string of length 100
        is_certified: Math.round(Math.random()), // Randomly selects 0 or 1
        price: "199.00",
        status: Math.round(Math.random()), // Randomly selects 0 or 1
        rating: (Math.floor(Math.random() * 5) + 1), // Generates a random integer between 1 and 5
        total_enrollments: (Math.floor(Math.random() * 100) + 1), // Generates a random integer between 1 and 100
        author: generateRandomData(15) // Generates a random string of length 15
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
  
    // Iterate over the generatedRequests array
    for (const request of generatedRequests) {
      const { url, id } = request;
  
      // Send a GET request with the random ID to the random URL
      const response = http.put(`${url}/${id}`, JSON.stringify(payload), params);
      // Record metrics and checks
      recordMetricsAndChecks(response);
    }
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
  console.log("Executed requests during the test:");
  executedRequests.forEach(request => {
    console.log(`URL: ${request.url}, ID: ${request.id}`);
  });
}
