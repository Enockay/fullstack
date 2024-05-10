const mongoose = require("mongoose");
require('dotenv').config();

//const url = process.env.MONGODB_URI;
const url = "mongodb+srv://myAtlasDBUser:Enockay23@myatlasclusteredu.bfx6ekr.mongodb.net/"

const connectDb = async () =>{
let response;
  try{
   //console.log(url);
    const connect = await mongoose.connect(url);
    response = 0;
    console.log(`successfully connected to the database`);
  }catch(error){
     response = `1 ${error}`
     console.log(`error occured while connecting to the database ${error}`);
  }
  return response
};

module.exports = connectDb;