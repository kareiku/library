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
    const table = document.getElementById("resultsTable");
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
    const data = await loadJSON('data.json');
    const searchTerm = document.getElementById("searchBox").value;
    const filteredData = queryData(data.table1, searchTerm);
    updateResults(filteredData);
};

document.getElementById("searchBox").addEventListener("input", loadAndQueryData);

document.getElementById("querybox").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Enter key pressed!");
    }
});
