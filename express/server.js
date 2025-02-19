const express = require('express');
const axios = require('axios');

const app = express();
const port =  3001 ;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sentiment Analysis API');
});

app.post('/analyze-sentiment', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'No text provided' });
        }
        const response = await axios.post('http://127.0.0.1:5000/predict', { text });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

