const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

// const port = 5000;

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(()=>{
    console.log("Connected Successfully")
    }).catch((error)=>{
    
      console.log("error with connecting with the db",error)
    
    })

    
const tasksRoutes = require("./routes/taskRoute");
app.use(tasksRoutes);


const userRoutes = require("./routes/userRoute");
app.use(userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
