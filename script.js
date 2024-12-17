const DATA = "data.json";
const QUERY_ID = "querybox";
const TABLE_ID = "results";

const loadJSON = async (url) => {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    localStorage.setItem(url, JSON.stringify(jsonData));
    return jsonData;
};

const queryData = (data, searchTerm) => {
    return data.filter(row => row.columnName.toLowerCase().includes(searchTerm.toLowerCase()));
};

const updateResults = (data) => {
    const table = document.getElementById(TABLE_ID);
    table.innerHTML = "";
    data.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(cellValue => {
            const td = document.createElement("td");
            td.textContent = cellValue;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
};

const loadAndQueryData = async () => {
    const data = await loadJSON(DATA);
    const searchTerm = document.getElementById(QUERY_ID).value;
    const filteredData = queryData(data.table1, searchTerm);
    updateResults(filteredData);
};

document.getElementById(QUERY_ID).addEventListener("input", loadAndQueryData);
