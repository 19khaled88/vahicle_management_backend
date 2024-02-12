import express from 'express'
import { inventoryController } from './controller';


const router = express.Router()

router.get('/list', inventoryController.getAllInventoryController)
router.get('/single/:id', inventoryController.singleInventoryController)
router.delete('/delete/:id', inventoryController.deleteInventoryController)
router.patch('/update/:id', inventoryController.updateInventoryController)

export const accessoryRouter = router