const { Router } = require("express")
const { createPostController, 
    getPostsController, 
    getPostController,
updatePost,
deletePost} = require("../controllers/postController");
const requireAuth = require("../middleware/auth.middleware");
const router = Router();

router.post("/posts", createPostController)
router.get("/posts", getPostsController)
router.get("/posts/:id", getPostController)
router.put("/posts/:id", requireAuth, updatePost)
router.delete("/posts/:id", requireAuth, deletePost)
module.exports = router;