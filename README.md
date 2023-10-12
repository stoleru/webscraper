# Web Scraping and React Frontend Documentation

This documentation provides instructions for installing and using the Web Scraping and React Frontend project. This project consists of a Node.js API for web scraping and a React frontend that consumes the API.

## Table of Contents

1. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Setting up the app](#setting-up-the-app)

2. [Usage](#usage)
   - [Running the app](#running-the-app)
   - [Testing the app](#testing-the-app)

3. [API Documentation](#api-documentation)

## 1. Installation

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for running the server and frontend.
- [Git](https://git-scm.com/) for cloning the project.

Clone the project repository:

```bash
   git clone https://github.com/stoleru/webscraper.git
   cd webscraper/
   ```

### Setting up the app

Install dependencies:
```bash
    npm i
    cd api/ && npm i
    cd ../client && npm i
```
  
## 2. Usage
### Running the app
Run this command from the project's folder as this will run concurently both the api and the client
```bash
    npm start
```
### Testing the app
```bash
    # test the client
    cd client && npm test
    # test the api
    cd api && npm test
```

## 3. API Documentation

- **Endpoint:** `/scrape`
- **HTTP Method:** POST
- **Description:** Scrapes data from a specified URL.
- **Request Body:**
  - `url` (string, required): The URL of the web page to scrape.
- **Response:**
  - `title` (string): The title of the article or blog post.
  - `short_description` (string): A short description of the article.
  - `image` (string): The URL of the article's image.
  - `href` (string): The URL of the article.
  - `sentiment` (string): The sentiment of the article's description (positive, neutral, negative).
  - `words` (number): The word count of the article's description.
  - `lang` (string): The language of the short_description

**Example Request:**

```http
POST /scrape
Content-Type: application/json

{
  "url": "https://wsa-test.vercel.app/"
}
```

**Example Response:**
```json
[
  {
    "title": "The Joys of Gardening",
    "short_description": "Explore the enriching world of gardening and discover its positive impact on mood and well-being.",
    "image": "https://example.com/images/garden.jpg",
    "href": "https://example.com/article/123",
    "sentiment": "positive",
    "words": 15,
    "lang": "en"
  },
  {
    "title": "The Challenges of Urban Living",
    "short_description": "A candid look at the challenges of urban living, with insights into coping strategies.",
    "image": "https://example.com/images/urban.jpg",
    "href": "https://example.com/article/456",
    "sentiment": "neutral",
    "words": 18,
    "lang": "en"
  }
]
```

### Error Handling
In case of an error, the API will respond with a JSON object containing an error message.

**Example Error Response:**
```json
{
  "error": "An error occurred while scraping the website."
}
```