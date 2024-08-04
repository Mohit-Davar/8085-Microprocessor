const addNewColumn = (worksheet, fields) => {
    const newColumns = []
    fields.forEach(column => {
        newColumns.push(
            { header: column.header, key: column.key, width: column.width },
        );
    });
    worksheet.columns = worksheet.columns || []
    worksheet.columns = worksheet.columns.concat(newColumns);
}
module.exports={
    addNewColumn
}