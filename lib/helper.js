const User = require("../model/userModel")
const bcrypt = require("bcryptjs")

// get users
const getUsers = () => {

    return new Promise(async(resolve, reject) => {
        const users = await User.find({})
            resolve(users)
    })

}

const createUser = async (userData) => {

    const { name, email, password} = userData;

    const user = await User.create({
        name, email, password
    })

    return user;


}

// userId: 6496c378250c72ee239b45e3

const getUser =  async () => {

    return new Promise(async(resolve, reject) => {

        const user = await User.findById("6496c378250c72ee239b45e3");

        if(user) {
                resolve(user)
                } else {
                    reject("no user found")
                }
    })
}

const loginUser = async(userData) => {

    const { email, password } = userData;
    const user = await User.findOne({email})

        if(user) {
            const checked = await bcrypt.compare(password, user.password)

                if(checked) {
                    return {
                        success: true,
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                } else {
                    return false
                }
        } else {
            return {
                error: "please enter valid credentials"
            }
        }
}
module.exports = {
    getUsers,
    createUser,
    getUser, 
    loginUser
}