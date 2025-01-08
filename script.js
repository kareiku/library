let originalData = null;
fetch("./data.json").then(response => response.json()).then(data => filterTable(originalData = data)).catch(error => console.error(error));

function populateTable(data) {
    const table = document.getElementById("results");
    const header = table.rows[0];
    table.innerHTML = "";
    table.appendChild(header);
    data.forEach(record => {
        const row = table.insertRow();
        record = [record.name, record.author, record.category, record.genre];
        record.forEach(field => {
            const cell = row.insertCell();
            cell.innerHTML = field === false ? false : field || "";
            // The block commented below this used to be used to substitute each URL in the JSON file for the corresponding cover
            /* const URLMatch = cell.innerHTML.match(/https?:\/\/[^\s]+/);
            if (URLMatch) {
                const img = document.createElement("img");
                img.src = URLMatch[0];
                cell.innerHTML = "";
                cell.appendChild(img);
            } */
        });
    });
}

function filterTable() {
    const column = document.getElementById("selector").value;
    const query = document.getElementById("filter").value;
    populateTable(query ? originalData.filter(record => selectColumn(column, record).toLowerCase().includes(query.toLowerCase())) : originalData);
}

function selectColumn(column, record) {
    return {
        "name": record.name,
        "author": record.author,
        "category": record.category,
        "genre": record.genre
    }[column] || "";
}
