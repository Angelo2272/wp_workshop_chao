const fs = require('fs');
const readline = require('readline');
const path = require('path');

const CONFIG_FILE = './dev/js/config.json';
const VSCODE_DIR = './.vscode';
const VSCODE_SETTINGS_FILE = path.join(VSCODE_DIR, 'settings.json');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

function createVSCodeSettings() {
    if (!fs.existsSync(VSCODE_DIR)) {
        fs.mkdirSync(VSCODE_DIR);
        console.log(`Created ${VSCODE_DIR} directory`);
    }

    const settingsContent = {
        "intelephense.files.maxSize": 3000000,
        "intelephense.stubs": [
            "apache",
            "bcmath",
            "bz2",
            "calendar",
            "com_dotnet",
            "Core",
            "ctype",
            "curl",
            "date",
            "dba",
            "dom",
            "enchant",
            "exif",
            "FFI",
            "fileinfo",
            "filter",
            "fpm",
            "ftp",
            "gd",
            "gettext",
            "gmp",
            "hash",
            "iconv",
            "imap",
            "intl",
            "json",
            "ldap",
            "libxml",
            "mbstring",
            "meta",
            "mysqli",
            "oci8",
            "odbc",
            "openssl",
            "pcntl",
            "pcre",
            "PDO",
            "pdo_ibm",
            "pdo_mysql",
            "pdo_pgsql",
            "pdo_sqlite",
            "pgsql",
            "Phar",
            "posix",
            "pspell",
            "readline",
            "Reflection",
            "session",
            "shmop",
            "SimpleXML",
            "snmp",
            "soap",
            "sockets",
            "sodium",
            "SPL",
            "sqlite3",
            "standard",
            "superglobals",
            "sysvmsg",
            "sysvsem",
            "sysvshm",
            "tidy",
            "tokenizer",
            "xml",
            "xmlreader",
            "xmlrpc",
            "xmlwriter",
            "xsl",
            "Zend OPcache",
            "zip",
            "zlib",
            "wordpress"
        ]
    };

    fs.writeFileSync(VSCODE_SETTINGS_FILE, JSON.stringify(settingsContent, null, 2), 'utf-8');
    console.log(`VS Code settings file created at ${VSCODE_SETTINGS_FILE}`);
}

async function setup() {
    if (fs.existsSync(CONFIG_FILE)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
        console.log(`Configuration already exists. Using server name: ${config.serverName}`);
    } else {
        const serverName = await askQuestion('Please enter the server name (e.g., localhost:8000 or wordpress.local): ');
        
        const config = { serverName };
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
        
        console.log(`Server name saved to ${CONFIG_FILE}`);
    }

    createVSCodeSettings();
}

setup();
