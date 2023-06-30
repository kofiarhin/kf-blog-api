const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const requireAuth = async(req, res, next) => {

        // check if thers an authorization
        // console.log(req.headers.authorization.startsWith("Bearer"))
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

                const accessToken = req.headers.authorization.split(" ")[1];

                if(!accessToken) return res.status(403).json({ error: "Access token not provided"})

                // verify access token
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

                    if(err) return res.status(403).json({ error: "Invalid access token"})
        

            const user = await User.findById(decoded.id)

                    req.user = user;
                    next()
                })

        } else {

            return res.status(403).json({ error: "Access token not provided"})
        }

}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWQ1MThjYzI0N2YyMGIwNzk3MWJmNCIsImlhdCI6MTY4ODAzMzM1MH0.gWYTcl2uD0JAYCRvInYeBtut5CZRyfceZrRe73Ww71E
module.exports = requireAuth;