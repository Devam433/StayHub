import express from 'express'
import { getAllStays, getAvailableStays } from '../controllers/publicController.js'


const router = express.Router()

// PUBLIC -> Get all the available stays
router.route('/getAllSatys').get(getAllStays)

router.route('/getAvailableStays').get(getAvailableStays)


export default router