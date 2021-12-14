const fs = require('fs')

module.exports = {
    fileReader: (path, callback, clean = true) => {
        fs.readFile(path, `utf8`, (err, data) => {
            if (err) throw err;
            const splitData = data.split("\n");
            const cleanData = clean ? splitData.filter(Boolean) : splitData;
            callback(cleanData)
        })
    },
    matrixReader: (path, callback) => {
        fs.readFile(path, `utf8`, (err, data) => {
            if (err) throw err;
            const splitData = data.split("\n\n");
            callback(splitData)
        })
    }
}
