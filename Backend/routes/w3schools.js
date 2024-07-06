const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Resource = require('../models/Resource');
const router = express.Router();

router.get('/scrape', async (req, res) => {
    try {
        const response = await axios.get('https://www.w3schools.com/java/default.asp');
        const $ = cheerio.load(response.data);
        const topics = [];

        $('.w3-bar-block a').each((index, element) => {
            const topic = {
                title: $(element).text(),
                url: 'https://www.w3schools.com' + $(element).attr('href')
            };
            topics.push(topic);
        });

        await Resource.insertMany(topics.map(topic => ({ ...topic, source: 'W3Schools' })));
        res.json({ msg: 'Scraping and saving successful' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find({ source: 'W3Schools' });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
