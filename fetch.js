const https = require('https');
https.get('https://automationexercise.com/login', res=>{
  let data='';
  res.on('data',chunk=>data+=chunk);
  res.on('end',()=> console.log(data.slice(0,5000)));
});
