const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function initializeWorkbook() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Alumni Data');

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Batch', key: 'batch', width: 10 },
        { header: 'Branch', key: 'branch', width: 20 },
        { header: 'Roll No', key: 'rollNo', width: 15 },
        { header: 'CGPA', key: 'cgpa', width: 10 },
        { header: 'Passport Photo', key: 'Image', width: 30 }
    ];

    return workbook;
}

async function updateWorkbook(workbook, name, branch, batch, rollno, cgpa) {
    const worksheet = workbook.getWorksheet('Alumni Data');
    worksheet.addRows([
        [name, batch, branch, rollno, cgpa],
    ]);
    const imagePath = path.join(__dirname, 'Images', 'DP.jpg');
    const imageBuffer = fs.readFileSync(imagePath);

    const imageId = workbook.addImage({
        buffer: imageBuffer,
        extension: 'jpeg',
    });

    worksheet.addImage(imageId, {
        tl: { col: 5, row: worksheet.rowCount - 1 },
        ext: { width: 100, height: 100 }
    });

    worksheet.getColumn(6).width = 20;
    worksheet.getRow(worksheet.rowCount).height = 100
    await workbook.xlsx.writeFile('Alumni.xlsx');
}

async function main(name, branch, batch, rollno, cgpa) {
    let workbook;
    if (fs.existsSync('Alumni.xlsx')) {
        workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('Alumni.xlsx');
    } else {
        workbook = await initializeWorkbook();
    }

    await updateWorkbook(workbook, name, branch, batch, rollno, cgpa);
}

module.exports = {
    main
}
