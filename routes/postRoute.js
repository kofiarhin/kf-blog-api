const { Router } = require("express")
const { createPostController, getPostsController} = require("../controllers/postController");
const requireAuth = require("../middleware/auth.middleware");
const router = Router();

router.post("/posts", createPostController)
router.get("/posts",requireAuth,getPostsController)
module.exports = router;