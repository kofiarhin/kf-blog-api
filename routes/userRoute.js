const { Router } = require("express")
const router = Router();
const requireAuth = require("../middleware/auth.middleware")
const { getUserController, getUsersController, createUserController, upDateUserController, userDeleteController, profileController, loginController } = require("../controllers/userController")
router.get("/users", getUsersController)
router.get("/users/:id", getUserController)
router.post("/users", createUserController)
router.put("/users/:id", upDateUserController)
router.delete("/users/:id", userDeleteController)
router.post("/login", loginController)
router.get("/profile", requireAuth, profileController)


module.exports = router;