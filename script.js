const CONFIG = {
    jsonFilePath: 'data.json',
    tableName: 'table1',
    searchField: 'name',
    localStorageKey: 'dataCache',
    querier: 'querybox',
    tableOutput: 'results'
};
const loadJSON = async (url) => {
    const cachedData = localStorage.getItem(CONFIG.localStorageKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(jsonData));
    return jsonData;
};
const queryData = (data, searchTerm, field) => {
    if (!data || data.length === 0) {
        console.error("Data is empty or undefined");
        return [];
    }
    return data.filter(row => row[field] && row[field].toLowerCase().includes(searchTerm.toLowerCase()));
};
const updateResults = (data) => {
    const table = document.getElementById(CONFIG.tableOutput);
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
    try {
        const data = await loadJSON(CONFIG.jsonFilePath);
        const tableData = data[CONFIG.tableName];
        if (!Array.isArray(tableData) || tableData.length === 0) {
            console.error(`No data found for table "${CONFIG.tableName}".`);
            return;
        }
        const searchTerm = document.getElementById(CONFIG.querier).value;
        const filteredData = queryData(tableData, searchTerm, CONFIG.searchField);
        updateResults(filteredData);
    } catch (error) {
        console.error("Error loading or processing data: ", error);
    }
};
document.getElementById(CONFIG.querier).addEventListener("input", loadAndQueryData);
