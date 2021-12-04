const fs = require('fs')

module.exports = {
    fileReader: (path, callback) => {
        fs.readFile(path, `utf8`, (err, data) => {
            if (err) throw err;
            const splitData = data.split("\n");
            const cleanData = splitData.filter(Boolean)
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
