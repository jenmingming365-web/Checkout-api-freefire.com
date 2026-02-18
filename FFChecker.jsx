import React, { useState } from 'react';
import axios from 'axios';

const FFChecker = () => {
    const [uid, setUid] = useState('');
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkId = async () => {
        if (!uid) return alert("Please enter a UID");
        setLoading(true);
        try {
            // Replace this URL with your published Render URL later
            const response = await axios.get(`http://localhost:5000/api/check-ff/${uid}`);
            setPlayer(response.data);
        } catch (err) {
            alert("Invalid ID or Server Error");
            setPlayer(null);
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial' }}>
            <h2>Free Fire ID Checker</h2>
            <input 
                type="text" 
                placeholder="Enter UID (e.g. 12345678)" 
                onChange={(e) => setUid(e.target.value)}
                style={{ width: '70%', padding: '10px' }}
            />
            <button onClick={checkId} style={{ padding: '10px' }}>
                {loading ? '...' : 'Verify'}
            </button>

            {player && (
                <div style={{ marginTop: '15px', padding: '15px', background: '#f4f4f4', borderRadius: '8px' }}>
                    <p><strong>Name:</strong> {player.nickname}</p>
                    <p><strong>Level:</strong> {player.level}</p>
                    <p><strong>Country:</strong> {player.region}</p>
                </div>
            )}
        </div>
    );
};

export default FFChecker;
