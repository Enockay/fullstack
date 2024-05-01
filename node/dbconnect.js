const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const connectDb = async () =>{
let response;
  try{
   console.log(url);
    const connect = await mongoose.connect(url);
    response = 0;

  }catch(error){
     response = `1 ${error}`
  }
  return response
};

module.exports = connectDb;