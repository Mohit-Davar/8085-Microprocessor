const express = require("express")
const {createWorkbook} = require("../controllers/createNewWorkbook.js")
const router = express.Router()

router.route("/create")
    .get((req, res) => {
        res.send("create WorkBooks")
    })
    .post(createWorkbook)

module.exports = router