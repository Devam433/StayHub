import { addStay, deleteStay, getAllStays, updateStay } from '../controllers/stayController.js'
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/multerMiddleware.js'
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js'


const router = express.Router()

//PUBLIC -> Get all the available stays
router.route('/').get(getAllStays)

//PRIVATE to role: Owner
router.route('/').post(authMiddleware,authorizeMiddleware(['Owner']),upload.array('images',5),addStay)

//PRIVATE to role: Owner
router.route('/:id').patch(authMiddleware,authorizeMiddleware(['Owner']), updateStay)
 
//PRIVATE to role: Owner
router.route('/:id').delete(authMiddleware, deleteStay)

export default router 