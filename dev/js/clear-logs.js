const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../docker/logs');

function clearLogs(directory) {
    if (fs.existsSync(directory)) {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            files.forEach(file => {
                const filePath = path.join(directory, file);

                fs.stat(filePath, (err, stat) => {
                    if (err) throw err;
                    
                    if (stat.isFile()) {
                        fs.unlink(filePath, (err) => {
                            if (err) throw err;
                            console.log(`Deleted log file: ${filePath}`);
                        });
                    } else if (stat.isDirectory()) {
                        console.log(`Skipping directory: ${filePath}`);
                    }
                });
            });
        });
    } else {
        console.log(`Logs directory does not exist at: ${directory}`);
    }
}

clearLogs(logsDir);
