//only for testing the api folder created in backend 
import ordersHandler from "./api/orders.js";

const req = { 
  method: "GET", 
  query: {} 
};
const res = { 
  status: (code) => ({ json: (data) => console.log(code, data) }) 
};

ordersHandler(req, res);
