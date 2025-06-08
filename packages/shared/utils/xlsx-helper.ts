import * as XLSX from 'xlsx';

interface ExcelExportOptions {
  sheetName?: string;
  fileName?: string;
}

export function jsonArrayToExcel<T extends Record<string, any>>(
  data: T[],
  options: ExcelExportOptions = {}
): void {
  // Default options
  const sheetName = options.sheetName || 'Sheet1';
  const fileName = options.fileName || 'export.xlsx';

  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON array to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    throw new Error(`Failed to export Excel file: ${error}`);
  }
}