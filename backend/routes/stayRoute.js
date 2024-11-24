import { addStay, deleteStay, getAllStays, updateStay } from '../controllers/stayController.js'
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllStays)
router.route('/').post(authMiddleware, addStay)
router.route('/:id').patch(authMiddleware, updateStay)
router.route('/:id').delete(authMiddleware, deleteStay)

export default router 