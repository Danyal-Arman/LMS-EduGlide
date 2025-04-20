import express from "express"
import { registerUser, loginUser, logoutUser, userProfile, updateProfile } from "../controllers/user.controller.js"
import isLoggedIn from "../middleware/isLoggedIn.js"
import upload from "../utils/multer.js"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/profile", isLoggedIn, userProfile)
router.put('/profile/update', isLoggedIn, upload.single('profilePhoto'), updateProfile)
router.post('/logout', logoutUser)

export default router; 





