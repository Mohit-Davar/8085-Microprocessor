const ExcelJS = require('exceljs');
const { addNewColumn } = require('../service/addNewColumn.js')
async function createWorkbook(req, res) {

    // declaring a new workbook
    const workbook = new ExcelJS.Workbook();

    // acquiring values from request body
    const {workbookName,fields,worksheetName} = req.body

    // creating a new sheet
    const worksheet = workbook.addWorksheet(worksheetName);

    // Adding Columns to sheet
    addNewColumn(worksheet,fields)

    // Generating Workbook Name without Spaces and then creating the file 
    const alteredWorkbookName = workbookName.split(" ").join("")
    await workbook.xlsx.writeFile(`${alteredWorkbookName}.xlsx`);
    res.end()
}

module.exports = {
    createWorkbook
}