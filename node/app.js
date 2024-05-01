const express = require("express");
const cors = require("cors");
const connectDb = require("./dbconnect");
const {insertData,fetchAll} = require("./modules");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist')); // frontend beoing part of backend 


app.post("/add/notes", (req, res) => {
  const note = req.body;
  //console.log(note);
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0;

  note.id = maxId + 1;
  notes = notes.concat(notes)

  //res.status(200).json({success : true, message : "data added successfully"});
  res.json({ note });
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

app.get("/connectDb", async (req, res) => {
  const response = await connectDb();
  
  if(response == 0){
    //const data = await insertData();
     const fetchData = await fetchAll();
    res.status(200).json({ success: true, message: fetchData})
  }else{
    res.status(500).json({success : true, message : response});
  }
 
});

app.get("/", (req, res) => {
  res.send("<h2>Hellow world am running on express server</h2>");
  //const reqItem = req.body;
  //console.log(req);
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
  res.status(200);
});

// a route with  aspecific id input for get 
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const note = notes.find(note => note.id == id);

  if (note) {
    res.json(note);
  } else {
    res.json("ERROR : 404 NOT FOUND")
    res.status(404).end();
  }

  //a route to delete items ;
  app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const deleteNote = notes.filter(note => note.id !== id);
    if (deleteNote) {
      res.json("successfully deleted");
      res.status(204).end();
    } else {
      res.json("Error Occured in deleting Item id", id);
      res.status(500).json("internal server error");
    }

  })

});

const PORT = process.env.PORT || 3002;

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

