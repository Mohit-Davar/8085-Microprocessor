const express = require("express")
const http = require("http")
const path = require("path")
const upload = require("./service/multer")
const { main } = require("./excel.js")

require('dotenv').config()

// Acquiring Express
const app = express()
// Using http module to create a server
const server = http.createServer(app)
app.use(express.urlencoded({ extended: false }));

app.post("/add", upload.single("file-upload"), (req, res) => {
    const { name, batch, branch, rollno, cgpa } = req.body
    main(name, branch, batch, rollno, cgpa)

})

server.listen(PORT, () => console.log(`Server Started at ${PORT}`))
