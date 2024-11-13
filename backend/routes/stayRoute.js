import { addStay, getAllStays } from '../controllers/stayController.js'
import express from 'express'

const router = express.Router()

router.route('/').get(getAllStays)
router.route('/').post(addStay)

export default router 