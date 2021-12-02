const fs = require('fs')

module.exports = {
    fileReader: (path, callback) => {
        fs.readFile(path, `utf8`, (err, data) => {
            if (err) throw err;
            callback(data.split("\n"))
        })
    }
}
