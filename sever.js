const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Stable 2026 API Endpoint
const API_URL = "https://free-ff-api-src-5plp.onrender.com/api/v1/account";

app.get('/api/check-ff/:uid', async (req, res) => {
    const { uid } = req.params;
    
    // Most Cambodian IDs work on the IND (India/Asia) or SG region
    // We try 'IND' first as it's the most common for the region's database
    const region = req.query.region || 'IND'; 

    try {
        const response = await axios.get(`${API_URL}?region=${region}&uid=${uid}`, {
            timeout: 8000 // Fails fast if game server is slow
        });

        if (response.data && response.data.basicInfo) {
            const player = response.data.basicInfo;
            
            res.json({
                success: true,
                nickname: player.nickname,
                level: player.level,
                region: player.region === 'IND' ? 'Cambodia/Asia' : player.region,
                likes: player.liked
            });
        } else {
            res.status(404).json({ success: false, message: "ID not found in this region" });
        }
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Game server busy. Try again in 2 seconds." 
        });
    }
});

// Health check for Render.com to keep it smooth
app.get('/', (req, res) => res.status(200).send("API is Live"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Smooth API on port ${PORT}`));
