module.exports = {
    apps: [{
        name: 'porto3D',
        script: './server.js',
        instances: 1,
        exec_mode: 'fork',
        port: 4101,
        env: {
            NODE_ENV: 'production',
            PORT: 4101,
            VITE_SUPABASE_URL: 'https://ezoeusfjbnjoziuwbaep.supabase.co',
            VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6b2V1c2ZqYm5qb3ppdXdiYWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0Njc3MTksImV4cCI6MjA2MTA0MzcxOX0.v3Eu1aHz8q_KtcCf40hz8GEDKI_lpilXqMrAlcaFgHc'
        },
        error_file: '/root/.pm2/logs/porto3D-error.log',
        out_file: '/root/.pm2/logs/porto3D-out.log'
    }]
};
