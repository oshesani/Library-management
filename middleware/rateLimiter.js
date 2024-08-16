
const rateLimit = require('express-rate-limit');


const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 8,
  message: 'Too many requests from this IP, please try again later.'
});


const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts from this IP, please try again later.'
});

const registerLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many registration attempts from this IP, please try again later.'
  });
  
  
  
module.exports = {
     generalLimiter, 
     loginLimiter,
      registerLimiter
     };
