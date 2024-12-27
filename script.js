const filePath = './data.json';
const fs = require('fs');

let data = fs.readFileSync(filePath, 'utf8');
data = JSON.parse(data);

data.forEach(o => console.log(o));
