const Post = require("../model/PostModel")

const createPostController = async(req, res) => {

    const { title, body, owner} = req.body;

    const post = await Post.create({title, body, owner})

    res.json(post)
}


// get list of post by owner
/**
 * 
 * type: private
 * route /post
 * list of posts by user
 */
const getPostsController = async(req, res) => {

    const posts = await Post.find({}).populate("owner")

    if(!posts)  return res.status(404).json({ error: "post not found"})
                res.status(200).json(posts)
}

// get post
const getPostController = async(req, res) => {

    const  id = req.params.id;
    const post = await Post.findById(id);

    if(!post) return res.status(404).json({ error: "Post not found"})
    res.status(200).json(post)

}

// update post
const updatePost = async(req, res) => {

    const userId = req.user.id;
    const id = req.params.id;
    const post = await Post.findById(id)
        const ownerId = post.owner;
    if(userId !== ownerId.toString()) return res.status(403).json({ error: "you are not authorized to updat this post"})

    post.title = req.body.title ? req.body.title : post.title;
    post.body = req.body.body ? req.body.body : post.body

    await post.save()

    res.json(post)
    // res.json({ userId, ownerId})

  
}
const deletePost = async(req, res) => {
   try {
    const userId = req.user.id;
    const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({ error: "post not found"})
        if(userId !== post.owner.toString()) return res.status(403).json({ error: "you are not authorized to deltet this post"})

        await Post.deleteOne({ _id: req.params.id})

    res.json({ success: true, id: req.params.id})
   } catch (error) {
    res.status(500).json({ error: "there was a problem fetching post"})
   }
}

module.exports = {
    createPostController,
    getPostsController,
    getPostController,
    updatePost,
    deletePost
}