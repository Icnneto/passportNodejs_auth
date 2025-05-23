import { Router } from "express";
import { registerUser } from "../controllers/registerUserController.js";
import { authenticateUser } from "../controllers/authUserController.js";
import { protectedRoute } from "../controllers/protectedRouteController.js";
import { logoutUser } from "../controllers/logoutUserController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * --------------- POST ROUTES --------------- 
 */

router.post('/loginUser', authenticateUser);
router.post('/registerUser', registerUser);

/**
 * --------------- GET ROUTES --------------- 
 */

router.get('/profile', isAuth, protectedRoute);
router.get('/logoutUser', logoutUser);

export default router;

