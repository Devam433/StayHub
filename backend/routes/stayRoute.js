import { addStay, deleteStay, getAllStays, updateStay } from '../controllers/stayController.js'
import express from 'express'

const router = express.Router()

router.route('/').get(getAllStays)
router.route('/').post(addStay)
router.route('/:id').patch(updateStay)
router.route('/:id').delete(deleteStay)

export default router 