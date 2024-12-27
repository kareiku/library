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
            });
        });
    })
    .catch(error => console.error(error));
/*
const tableData = document.getElementById("results");
console.log(typeof tableData);
*/
