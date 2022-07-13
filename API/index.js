const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");


const cors = require("cors");
const multer = require("multer");
const path = require("path");
const router = express.Router();


dotenv.config();

app.use(cors());


//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to server"))
  .catch((err) => console.log(err));


//setting folder to public images 
app.use("/images", express.static(path.join(__dirname, "public/images")));




//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use(morgan("common"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});


//adding multer and uploading files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },

});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);






app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running on port 8800! ");
});
