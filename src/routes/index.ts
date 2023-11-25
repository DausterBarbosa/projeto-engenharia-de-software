import {Router} from "express";

import userController from "../controllers/userController";
import coachController from "../controllers/coachController";
import sessionController from "../controllers/sessionController";
import trainingController from "../controllers/trainingController";

import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/login", sessionController.login);

router.get("/coach/users", authMiddleware, coachController.getAllUsers);
router.delete("/coach/user/:id", authMiddleware, coachController.deleteUser);

router.get("/training/:id", authMiddleware, trainingController.getAllTrainings);
router.post("/training/create", authMiddleware, trainingController.create);
router.put("/training/:id", authMiddleware, trainingController.update);
router.delete("/training/:id", authMiddleware, trainingController.delete);

router.get("/user/profile", authMiddleware, userController.getProfile);
router.get("/user/:id", authMiddleware, userController.getUser);
router.post("/user/create", userController.create)
router.put("/user/:id", authMiddleware, userController.update);
router.delete("/user/:id", authMiddleware, userController.delete);

export default router;