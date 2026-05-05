/* eslint-disable no-undef */
module.exports = {
    apps: [
        {
            name: 'noxh-api',
            script: './index.js',
            cwd: './server',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production'
            },
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_file: './logs/combined.log',
            time: true
        },
        {
            name: 'noxh-cache',
            script: './server/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};
