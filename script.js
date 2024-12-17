const fs = require("fs");

const CONFIG = {
    dataset = "data.json",
    inputFieldId = "querybox",
    outputTableId = "results"
};

function readJSONFile(filename) {
    let content = null;
    fs.readFile(filename, "utf-8", function (err, data) {
        if (!err) content = JSON.parse(data);
    });
    return content;
}

