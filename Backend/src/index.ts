const express = require ('express')

const mongoose = require ('mongoose')

const cors = require ('cors')

const cookieParser = require ('cookie-parser')

const app = express()

const userRoutes = require ('./routes/users')

const adminRoutes = require ('./routes/admin')

const bodyParser = require('body-parser');

// app.use(cors({
//     credentials : true,
//     origin : ['http://localhost:4200']
// }))

app.use(cookieParser())

app.use(express.json())

app.use("/",userRoutes)

app.use("/admin",adminRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/aventura",{
   
})
.then(() =>{
    console.log("connected to database")
    app.listen(5000,() =>{
        console.log("App is listen on port 5000");
    })

})