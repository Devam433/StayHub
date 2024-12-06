import { addStay, deleteStay, getAllStays, updateStay } from '../controllers/stayController.js'
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/multerMiddleware.js'
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js'


const router = express.Router()

router.route('/').get(getAllStays)
router.route('/').post(authMiddleware,authorizeMiddleware(['Owner']),upload.array('images',5),addStay)
router.route('/:id').patch(authMiddleware,authorizeMiddleware(['Owner']), updateStay)
router.route('/:id').delete(authMiddleware, deleteStay)

export default router 