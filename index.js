const fs = require('fs');
const http = require('http');
const url = require('url');

// *********** files ************

// Blocking, synchronous way
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

console.log(fs.readFileSync("./txt/output.txt", "utf-8"));
*/

// Non-blocking, asynchronous way
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    // console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      //   console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been successfully written 👍");
      });
    });
  });
});
*/

// *********** SERVER ************

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    console.log(pathName);
    res.end('This is the overview');
  } else if (pathName === '/product') {
    res.end('This is the product');
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, (err) => {
  if (err) throw err;
  console.log('Server running on port 8000');
});
