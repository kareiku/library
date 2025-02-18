let originalData = null;
fetch("./data.json").then(response => response.json()).then(data => filterTable(originalData = data)).catch(error => console.error(error));

function populateTable(data) {
    const table = document.getElementById("results");
    const header = table.rows[0];
    table.innerHTML = "";
    table.appendChild(header);
    data.forEach(record => {
        const row = table.insertRow();
        record = [record.name, record.author, record.category, record.genre, record.progress];
        record.forEach(field => {
            const cell = row.insertCell();
            cell.innerHTML = field === false ? false : field || "";
        });
    });
}

function filterTable() {
    const column = document.getElementById("selector").value;
    const query = document.getElementById("filter").value;
    populateTable(query ? originalData.filter(record => (record[column] || "").toLowerCase().includes(query.toLowerCase())) : originalData);
}
