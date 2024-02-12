import express from "express";
import validateRequest from "../../middlewares/validateUser";
import { DriverController } from "./driver.controller";
import { driverValidationSchema } from "./driver.validation";
const router = express.Router();

router.post("/", validateRequest(driverValidationSchema.createDriver), DriverController.insertIntoDB);
router.get("/", DriverController.getAllFromDB);
router.get("/single/:id", DriverController.getByIdFromDB);
router.patch("/update/:id", DriverController.updateOneInDB);
router.delete("/delete/:id", DriverController.deleteByIdFromDB);

export const DriverRoutes = router;