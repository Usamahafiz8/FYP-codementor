const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Resource = require('../models/Resource');
const router = express.Router();

router.get('/scrape', async (req, res) => {
    try {
        const response = await axios.get('https://www.freecodecamp.org/news/tag/java/');
        const $ = cheerio.load(response.data);
        const tutorials = [];

        $('.post-card-title a').each((index, element) => {
            const tutorial = {
                title: $(element).text(),
                url: $(element).attr('href')
            };
            tutorials.push(tutorial);
        });

        await Resource.insertMany(tutorials.map(tutorial => ({ ...tutorial, source: 'FreeCodeCamp' })));
        res.json({ msg: 'Scraping and saving successful' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find({ source: 'FreeCodeCamp' });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
