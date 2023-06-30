const jwt = require("jsonwebtoken")


const run = async() => {
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGVicm9uIiwiaWF0IjoxNjg4MDI5OTE4fQ.PA251IZG0A1VlFe0l3hg1rbP2PyZ6RPECIziCTQ8iqs"
    
    jwt.verify(token, "password123", (err, decoded) => {
    
        console.log(decoded.name)
    })
}

run()