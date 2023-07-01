const { getUsers, createUser } = require("../lib/helper")
const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// get list of users
const getUsersController =  async (req, res) => {
    
    const users = await getUsers()
    console.log(users)

    return res.status(200).json(users)

            
}

const handleErrors = (error) => {

    if(error.message.includes("User validation failed")) {
        const errors = Object.values(error.errors)
        console.log(errors)
        
    }
}

// create list of users
const createUserController = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const user = await createUser({name, email, password})
    res.status(200).json({
        success: true,
        name: user.name,
        email: user.email
    })
    } catch (error) {


        // handle errors 
        // const errors = handleErrors(error) //todo handle errors properly
        console.log(error.message);

        res.json({ error: "There was a problem creating the account"})
        
    }
}


// get user
const getUserController = async(req, res) => {
    const id = req.params.id;

    const user =  await User.findById(id)
    if(!user) {
        return res.json({ error: "user not found"})
    }

    res.status(200).json({ name: user.name, email: user.email, createdAt: user.createdAt})

}

// update user
const upDateUserController = async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if(!user) {
        return res.json({ error: "user not found"})
    }

    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password

    await user.save();

    return res.json({name: user.name, email: user.email, password: user.password})
    // })
}

// delete user
const userDeleteController = async(req, res) => {

    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.json({ error: "user not found"})

    await User.deleteOne({_id: id})
    res.status(200).json({success: "user deleted", id: user.id})
}


// generate token
const genToken = (id) => {

    const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d"})

    return token;
}

const loginController = async(req, res) => {

    const { email, password} = req.body;

    // get user from database
    const user = await User.findOne({ email});
    console.log(user)

    if(!user) return res.json({ error: "user not found"})

    // compare password

    const isAuth = await bcrypt.compare(password, user.password)

    if(!isAuth) return res.status(403).json({error: "check credentials and try again"})

    res.status(200).json({
        id: user._id, 
        name: user.name,
        email: user.email,
        token: genToken(user._id)
    })
}

// get user profile
const profileController = async(req, res) => {

    res.json(req.user)
}


module.exports = {
    getUsersController,
    createUserController,
    getUserController,
    upDateUserController,
    userDeleteController,
    loginController,
    profileController
};