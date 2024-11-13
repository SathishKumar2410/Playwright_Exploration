import { readFile, utils } from 'xlsx';
class TestDataReader {
    readExcelInJson(sheetName, testCaseId) {
        const filePath = `${process.cwd()}\\resources\\TestData.xlsx`;
        console.log(`Path --> ${filePath}`);
        const workbook = readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet);

        // Filter data for the specific Test Case ID
        const filteredData = jsonData.filter(data => data.Test_Case_ID === testCaseId);
        return filteredData; // Returns an array of objects
    }

    getTestDataFromExcelSheet(sheetName, testCaseId) {
        try {

            const path = process.env.CI ? `${process.env.GITHUB_WORKSPACE}/resources/TestData.xlsx` : `${process.cwd()}\\resources\\TestData.xlsx`;
            console.log(`Path --> ${path}`);

            // Load the workbook
            const workbook = readFile(path);
            const sheet = workbook.Sheets[sheetName];

            // Get the range of the sheet
            const range = utils.decode_range(sheet['!ref']);
            let testData = {};

            // Find the header row and the Test_Case_ID column index
            let testCaseIDColumn = -1;

            for (let col = range.s.c; col <= range.e.c; col++) {
                const headerCell = sheet[utils.encode_cell({ r: 0, c: col })];
                if (headerCell && headerCell.v === "Test_Case_ID") {
                    testCaseIDColumn = col;
                    break;
                }
            }

            // If Test_Case_ID column is found
            if (testCaseIDColumn !== -1) {
                // Iterate through the rows
                for (let row = 1; row <= range.e.r; row++) {
                    const dataCell = sheet[utils.encode_cell({ r: row, c: testCaseIDColumn })];
                    if (dataCell && dataCell.v.toString().toLowerCase() === testCaseId.toLowerCase()) {
                        // Populate testData object with header-value pairs
                        for (let col = range.s.c; col <= range.e.c; col++) {
                            const header = sheet[utils.encode_cell({ r: 0, c: col })];
                            const value = sheet[utils.encode_cell({ r: row, c: col })];
                            if (header && value) {
                                testData[header.v] = value.v; // Use .v to get the cell value
                            }
                        }
                        break;
                    }
                }
            }
            console.log(testData);
            return testData;
        }
        catch (error) {
            console.error('Error reading the excel file:', error);
        }
    }
}
module.exports = TestDataReader;