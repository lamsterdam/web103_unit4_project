import express from 'express'

// import controller for customizations
import customizationController from '../controllers/customizationController.js'

const router = express.Router()

// define routes to get the exterior, drainage, metrial, shape table
router.get('/exteriors', customizationController.getExteriors)
router.get('/shapes', customizationController.getShapes);
router.get('/materials', customizationController.getMaterials);
router.get('/drainages', customizationController.getDrainages);


export default router