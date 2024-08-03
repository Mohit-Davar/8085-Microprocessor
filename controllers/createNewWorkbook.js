const ExcelJS = require('exceljs');
const fs = require('fs');
async function createWorkbook(req, res) {
    // declaring a new workbook
    const workbook = new ExcelJS.Workbook();

    // acquiring values from request body
    const {workbookName,fields,worksheetName} = req.body

    // creating a new sheet
    const worksheet = workbook.addWorksheet(worksheetName);

    // Adding Columns to sheet
    const newColumns = []
    fields.forEach(column => {
        newColumns.push(
            { header: column.header, key: column.key, width: column.width },
        );
    });
    worksheet.columns=[]
    worksheet.columns = worksheet.columns.concat(newColumns);

    // Generating Workbook Name without Spaces and then creating the file 
    alteredWorkbookName = workbookName.split(" ").join("")
    await workbook.xlsx.writeFile(`${alteredWorkbookName}.xlsx`);
    res.end()
}

module.exports = {
    createWorkbook
}