let originalData = null;
fetch("./data.json").then(response => response.json()).then(data => filter(originalData = data)).catch(error => console.error(error));

function populate(data) {
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

function filter() {
    const query = document.getElementById("filter").value;
    populate(query ? originalData.filter(record => record.name.toLowerCase().includes(query.toLowerCase())) : originalData);
}
