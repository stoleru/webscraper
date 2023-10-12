const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const langdetect = require('langdetect');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Define lists of positive and negative keywords
const positiveKeywords = ['good', 'happy', 'positive', 'excellent', 'joyful'];
const negativeKeywords = ['bad', 'sad', 'negative', 'poor'];

// Function to perform sentiment analysis
const analyzeSentiment = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  // Calculate the sentiment score
  words.forEach(word => {
    if (positiveKeywords.includes(word)) {
      score += 1;
    } else if (negativeKeywords.includes(word)) {
      score -= 1;
    }
  });

  // Determine sentiment based on the score
  let sentiment;
  if (score > 0) {
    sentiment = 'positive';
  } else if (score < 0) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  return sentiment;
}

// Define an endpoint to scrape the website
app.post('/scrape', async (req, res) => {
  const browser = await puppeteer.launch({headless: "true"});
  const page = await browser.newPage();
  const { url } = req.body;
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const items = await page.evaluate(() => { 
      return [...document.querySelectorAll('a')]
        .filter(el => el.querySelectorAll("img").length)
        .map(el => {
          const article = el.parentElement
          const group = article.querySelectorAll(".group > div")
          const title = group[0].textContent
          const short_description = group[1].textContent
          const image = article.querySelector('img').src
          const href= article.querySelector("a").href
          const words = short_description.split(/\s+/).length;
          return {
            title,
            short_description,
            image,
            href,
            words,
          }
        })
    });

    res.json(items.map(el => {
      el.sentiment = analyzeSentiment(el.short_description)
      el.lang = langdetect.detectOne(el.short_description);
      return el
    }));

  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ error: 'An error occurred while scraping the website.' });
  }
  finally {
    await browser.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app