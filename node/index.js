const http = require("http");


const app = http.createServer((request,response)=>{
    response.writeHead(200,{'content-Type':'text/plain'})
    response.end(JSON.stringify(notes));
});
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ];
const PORT = 3001;
app.listen(PORT);
console.log(`app running on port ${PORT}`);