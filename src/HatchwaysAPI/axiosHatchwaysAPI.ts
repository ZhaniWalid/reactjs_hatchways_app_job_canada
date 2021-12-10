// Use this cmd: 'npm install axios' in the 'Integrated Terminal of VS CODE' or 'Terminal of Windows' to install it
// Promise based HTTP client for the browser and node.js => Automatic transforms for JSON data
import axios from 'axios';

const hatchwaysBaseURL = 'https://api.hatchways.io/assessment/students';

export const hatchwaysGetAllStudentsAPI = axios.get(hatchwaysBaseURL);