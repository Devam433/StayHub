import express from "express"
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import authMiddleware from '../middlewares/authMiddleware.js'
import { bookStay, removeInterestInStay, showInterestInStay, unbookStay } from "../controllers/bookingStayController.js";
const router = express.Router();

router.patch('/book-stay/:id', authMiddleware, authorizeMiddleware(['Tenant']),bookStay)
router.patch('/un-book-stay/:id',authMiddleware, authorizeMiddleware(['Tenant']),unbookStay)

//The below 2 routes are not for booking but for showing and removing interest. It 
router.post('/show-interest/:id',authMiddleware, authorizeMiddleware(['Tenant']), showInterestInStay) //this route is for getting into selectedByQueue when the Owner has tenentReviewByOwnerRequired as true /done
router.post('/remove-interest/:id',authMiddleware, authorizeMiddleware(['Tenant']),removeInterestInStay )
export default router;