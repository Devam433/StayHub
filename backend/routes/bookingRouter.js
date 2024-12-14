import express from "express"
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import authMiddleware from '../middlewares/authMiddleware.js'
import { bookStay, unbookStay } from "../controllers/bookingStayController.js";
const router = express.Router();

// router.get('/',get)
router.post('/book-stay/:id', authMiddleware, authorizeMiddleware(['Tenant']),bookStay)
router.post('/un-book-stay/:id',authMiddleware, authorizeMiddleware(['Tenant']),unbookStay)

router.post('/show-interest') //this route is for getting into selectedByQueue when the Owner has tenentReviewByOwnerRequired as true
export default router;