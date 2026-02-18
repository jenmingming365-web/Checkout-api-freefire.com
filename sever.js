const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// This uses a direct URL to check IDs so you don't need extra files
app.get('/api/check-ff/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        // Checking Singapore/Cambodia region database
        const url = `https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=IND&uid=${uid}`;
        const response = await axios.get(url);

        if (response.data && response.data.basicInfo) {
            const player = response.data.basicInfo;
            res.json({
                success: true,
                nickname: player.nickname,
                level: player.level,
                region: "KH/SG"
            });
        } else {
            res.status(404).json({ success: false, message: "Player not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server busy, try again" });
    }
});

app.get('/', (req, res) => res.send("API is running smooth!"));

const PORT = process.env.PORT || 10000; // Render prefers 10000 or dynamic
app.listen(PORT, '0.0.0.0', () => console.log(`Server live on ${PORT}`));
