require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const cors=require('cors')
const path= require('path')
const fileURLToPath= require('url').fileURLToPath
const dirname =require('path').dirname

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/posts", postRoutes); 

app.get("/api/test",(req, res)=>res.send("api is working"))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
