const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bookRouter = require("./routes/livros")
const authorsRouter = require("./routes/authors")
const clientsRouter = require("./routes/clients")
const rentBookRouter = require("./routes/rentBook")



dotenv.config()

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connected to MongoDB")
})

//middleware
app.use(express.json())

app.use("/api/book", bookRouter)
app.use("/api/author", authorsRouter)
app.use("/api/client", clientsRouter)
app.use("/api/rent", rentBookRouter)

app.listen(process.env.PORT || 5050, () => {
    console.log("Backend server is running!")
})