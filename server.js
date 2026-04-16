import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4101;

// Environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase credentials in environment variables');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to fetch projects (backend proxy)
app.get('/api/projects', async (req, res) => {
    try {
        console.log('📡 Fetching projects from Supabase...');

        // Use REST API directly
        const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            console.error('❌ HTTP error:', response.status, response.statusText);
            return res.status(response.status).json({
                error: `HTTP ${response.status}: ${response.statusText}`
            });
        }

        const data = await response.json();
        console.log('✅ Projects fetched:', Array.isArray(data) ? data.length : 0, 'records');
        res.json(data);
    } catch (err) {
        console.error('❌ Server error:', {
            message: err.message,
            code: err.code,
            cause: err.cause?.message
        });
        res.status(500).json({
            error: err.message || 'Internal server error',
            details: err.toString()
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback - serve index.html for all routes not matched above
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Porto3D Server Running                ║
║   URL: http://localhost:${PORT}          ║
║   API: http://localhost:${PORT}/api/projects ║
║   Status: http://localhost:${PORT}/api/health ║
╚════════════════════════════════════════╝
  `);
});
