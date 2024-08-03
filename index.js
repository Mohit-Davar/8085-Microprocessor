const express = require("express")
require('dotenv').config()
const PORT = process.env.PORT || 8001

const fileRouter = require("./routes/fileRoute.js")

// Acquiring Express
const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/Workbook", fileRouter)

app.listen(PORT, () => console.log(`Server Started at ${PORT}`))
