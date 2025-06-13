// hRf8CUn3jKSsFk5f
// mongodb+srv://danyalarman15:hRf8CUn3jKSsFk5f@cluster0.qvb9q.mongodb.net/
import express from "express"
import ConnectDB from "./database/Database.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import lectureRoute from "./routes/lecture.route.js"
import mediaRoute from "./routes/media.route.js"
import paymentRoute from "./routes/payment.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(express.static('public')); // Where 'public' is the folder containing static assets like your favicon.ico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



dotenv.config()
ConnectDB()  

// Allow frontend (5173) to access backend (3000)
app.use(cors({
    origin: "https://eduglide-client.onrender.com" || "http://localhost:5173", 
    credentials:true 
}))



app.use('/user', userRoute);
app.use('/course', courseRoute);
app.use('/lecture', lectureRoute);
app.use('/media', mediaRoute) 
app.use('/purchase', paymentRoute)
app.use('/course-progress', courseProgressRoute)
const port =  3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});     