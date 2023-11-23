import {Router} from "express";

import userController from "../controllers/userController";
import coachController from "../controllers/coachController";
import sessionController from "../controllers/sessionController";
import trainingController from "../controllers/trainingController";

const router = Router();

router.get("/coach/users", coachController.getAllUsers);
router.delete("/coach/deleteuser/:id", coachController.deleteUser);

router.get("/training/:id", trainingController.getAllTrainings);
router.post("/training/create", trainingController.create);
router.put("/training/:id", trainingController.update);
router.delete("/training/:id", trainingController.delete);

router.get("/user/:id", userController.getUser);
router.post("/user/create", userController.create)
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

export default router;