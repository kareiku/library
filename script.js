fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById("results");
        data.forEach(item => {
            let values = [item.name, item.author, item.genre, item.category, item.subcategory, item.src];
            let row = table.insertRow();
            values.forEach(value => {
                let cell = row.insertCell();
                cell.innerHTML = value || null;
                const match = cell.innerHTML.match(/https?:\/\/[^\s]+/)
                if (match) {
                    const img = document.createElement("img");
                    img.src = match[0];
                    cell.innerHTML = "";
                    cell.appendChild(img);
                }
            });
        });
    })
    .catch(error => console.error(error));

const table = document.getElementById("results");
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const originalData = rows.map(row => 
        Array.from(row.cells).map(cell => cell.textContent)
    );
    document.getElementById("filter").addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredData = originalData.filter(row => 
            row[0].toLowerCase().includes(query)
        );

        const tbody = table.querySelector("tbody");
        tbody.innerHTML = filteredData.map(row =>
            `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`
        ).join("");
    });
