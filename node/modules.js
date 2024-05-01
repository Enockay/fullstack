const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    content: {
        type: Array,
        required: true
    },
    items: {
        type: Number,
        required: true
    }
});

dataSchema.set('toJSON',{
    transform : (doc,item)=>{
        const returnedId = item._id.toString();
        delete returnedId;
        delete item._v
    } 
})

const note = mongoose.model("Notes", dataSchema);

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

const insertFunction = async () => {
    let state;
    try {
        const insertData = new note({
            content: notes,
            items: notes.length
        });

        const saveData = await insertData.save();
        if (saveData) {
            state = `data successfully inserted in the database ${insertData}`
            mongoose.connection.close();
        }

    } catch (error) {
        state = `error occured while inserting data ${error}`
    }
    return state;
}

const fetchAll = async ()=> {

    const query = {};
    const data = note.find(query);
    return data;

}

module.exports =  { insertFunction,fetchAll}