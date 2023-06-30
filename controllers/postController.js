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

    console.log(req.user)

    const posts = await Post.find({owner: req.user._id}).populate("owner")

    if(!posts)  return res.status(404).json({ error: "post not found"})
                res.status(200).json(posts)
}

module.exports = {
    createPostController,
    getPostsController
}