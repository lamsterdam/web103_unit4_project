import express from 'express'

// import controllers for pots
import potsController from '../controllers/potsController.js'

const router = express.Router()

// define routes to get, create, edit and delete pots
// get all pots
router.get('/', potsController.getPots)

// get a certain pot details
router.get('/:id', potsController.getPotById)

// edit a certain pot
router.patch('/:id', potsController.editPotById)

// delete a certain pot
router.delete('/:id', potsController.deletePotById)

// create a pot
router.post('/', potsController.createPot)

export default router