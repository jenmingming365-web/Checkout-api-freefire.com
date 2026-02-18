const express = require('express');
const FreeFireAPI = require('@pure0cd/freefire-api');
const cors = require('cors');

const app = express();
const api = new FreeFireAPI();

app.use(cors());
app.use(express.json());

// Main API Route
app.get('/api/check-ff/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        // Fetches data directly from Garena servers
        const profile = await api.getPlayerProfile(uid);

        if (profile && profile.basicinfo) {
            const data = profile.basicinfo;
            
            // Logic to show KH for Cambodian players (usually in SG region)
            const regionDisplay = data.region === 'SG' ? 'Cambodia (SG)' : data.region;

            res.json({
                success: true,
                nickname: data.nickname,
                level: data.level,
                region: regionDisplay,
                account_id: data.accountid
            });
        } else {
            res.status(404).json({ success: false, message: "ID not found" });
        }
    } catch (error) {
        console.error("FF API Error:", error);
        res.status(500).json({ success: false, message: "API is currently busy" });
    }
});

// Health check for Render.com
app.get('/', (req, res) => res.send("Free Fire API is Online"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
