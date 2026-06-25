const express=require('express')
const { default: mongoose } = require('mongoose');
const cookieParser=require('cookie-parser')
const cors=require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoute=require('./Routes/auth')
const userRoute=require('./Routes/users')
const postRoute=require('./Routes/posts')
const commentRoute=require('./Routes/comments');
const likeRoute = require("./Routes/likes");

const app = express();



// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (err) {
        console.error("DB connection failed", err);
    }
};

// Middlewares

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// Serve uploaded images

// server.js / app.js (main backend file)
const path = require("path")
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute);
app.use("/api/likes", likeRoute);

// Start the server

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`App is running on port ${process.env.PORT}`);
});