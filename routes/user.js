import  express  from "express";
import userContoller from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/user.middleware.js";
const router = express.Router();


router.post("/signUp", userContoller.userRegistration);
router.post("/login", userContoller.userLogin);
router.get("/:username",isAuthenticated, userContoller.getUser);


export default router;