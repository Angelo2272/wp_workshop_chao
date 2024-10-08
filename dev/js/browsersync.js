const browserSync = require('browser-sync').create();
const fs = require('fs');
const chokidar = require('chokidar');

const CONFIG_FILE = './dev/js/config.json';

function getServerName() {
    if (fs.existsSync(CONFIG_FILE)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
        return config.serverName;
    } else {
        throw new Error(`Config file not found: ${CONFIG_FILE}`);
    }
}

(async () => {
    try {
        const serverName = getServerName();
        const PROXY_URL = `http://${serverName}`;

        browserSync.init({
            proxy: PROXY_URL,
            files: [
                '**/*.php',
                '**/*.html',
                './style.css',
                './dist/js/*.js' 
            ],
            injectChanges: true,
            open: false,
            notify: true,
            reloadOnRestart: true,
            ghostMode: false,
            cors: true,
            serveStatic: ['./']
        });

        chokidar.watch('./style.css').on('change', () => {
            browserSync.reload('styles.css');
        });

        chokidar.watch('./dist/js/*.js').on('change', () => {
            browserSync.reload();
        });
    } catch (error) {
        console.error('Error initializing BrowserSync:', error);
    }
})();
