// const DATA_DIR = "./data";
const QUERY_ID = "querybox";
const TABLE_ID = "results";
let fileList = ["./data/anime.csv"];

/*
const fs = require("fs");

fs.readdir(DATA_DIR, (err, file) => {
    if (!err) fileList.append(file);
});
*/

// Function to fetch and parse CSV files
async function loadCSVFiles() {
    const dataTables = [];
    for (const file of fileList) {
        const response = await fetch(file);
        const text = await response.text();
        const rows = text.trim().split("\n").map(row => row.split(","));
        dataTables.push(rows);
    }
    return dataTables;
}

// Function to display data in the table
function displayTable(data) {
    const table = document.getElementById(TABLE_ID);
    table.innerHTML = ""; // Clear table

    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const cellElement = document.createElement(index === 0 ? "th" : "td");
            cellElement.textContent = cell;
            tr.appendChild(cellElement);
        });
        table.appendChild(tr);
    });
}

// Function to filter data based on query
function filterData(dataTables, query) {
    if (!query) return dataTables.flat();
    return dataTables.flat().filter(row => row.some(cell => cell.toLowerCase().includes(query.toLowerCase())));
}

// Main logic
(async function () {
    const dataTables = await loadCSVFiles();

    // Display all data initially
    displayTable(dataTables.flat());

    // Add event listener for search query
    const queryBox = document.getElementById(QUERY_ID);
    queryBox.addEventListener("input", () => {
        const query = queryBox.value;
        const filteredData = filterData(dataTables, query);
        displayTable(filteredData);
    });
})();
