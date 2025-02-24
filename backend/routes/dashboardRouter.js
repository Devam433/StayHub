import verifyToken from "../middlewares/authMiddleware.js";
import express from "express"
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import { getOwnerDashboard, getTenantDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.route('/owner').get(verifyToken,authorizeMiddleware(['Owner']),getOwnerDashboard)
router.route('/tanent').get(verifyToken,authorizeMiddleware(['Tenant']),getTenantDashboard)
export default router;