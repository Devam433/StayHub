import express from 'express'
import { getAllStays } from '../controllers/publicController.js'
import { getAvailableStays } from '../controllers/bookingStayController.js'

const router = express.Router()

// PUBLIC -> Get all the available stays
router.route('/getAllSatys').get(getAllStays)

router.route('/getAvailableStays').get(getAvailableStays)


export default router 