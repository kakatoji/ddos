import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 2000 }, 
    { duration: '1m', target: 50 },    
    { duration: '1m', target: 1000 },   
    { duration: '30s', target: 0 },    
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], 
    http_req_failed: ['rate<0.05'],    
  },
};

export default function () {
  let res = http.get('https://google.com');

  check(res, {
    'status 200': (r) => r.status === 200,
    'response < 3s': (r) => r.timings.duration < 3000,
  });

  
}

