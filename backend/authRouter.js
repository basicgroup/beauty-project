import { Router } from "express";
import controller from "./authControler.js";
import { check } from "express-validator";
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
const router = new Router();

router.post(
  "/signup",
  [
    check("name", " Fill in the Name field").notEmpty(),
    check("lastname", " Fill in the Lastname field").notEmpty(),
    check("email", " Fill in the Email field").isEmail(),
    check(
      "password",
      "Password must be more than 4 and less than 10 characters"
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.signUp
);
router.post("/signin", controller.signIn);
router.get("/users", roleMiddleware(["ADMIN"]),controller.getUsers);
router.post("/deletuser",roleMiddleware(["ADMIN"]),controller.deleteUsers)
router.post("/Asignin",roleMiddleware(["ADMIN"]),controller.adminSignin)
router.get('/refreshtoken',authMiddleware,controller.getToken)
router.post("/uploading",authMiddleware,controller.uplodProduction)
router.get("/getproducts",authMiddleware,controller.getProducts)

export default router;
