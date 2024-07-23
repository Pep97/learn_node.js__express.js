// min 5:30
// import

const express = require('express');

// create an express app

const app = express();

//register view engine

app.set('view engine', 'ejs');

//middleware & static files

app.use(express.urlencoded({ extended: true }));

// listen for requests

app.listen(3009);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/crawl', (req, res) => {
    res.render('index');
});


// endpoint for starting the crawl

app.post('/crawl',  (req, res) => {

    console.log(req.body);
});




// ORIGINAL CODE
    // app.use(express.json());

    // // index.js
    // app.post('/crawl', async (req, res) => {
    //     const { baseUrl } = req.body;
    
    //     try {
    //         const {crawlPage} = require('./crawl.js')
    //         const {printReport} = require('./report.js')

    //         console.log(`starting crawl of ${baseUrl}`)
    //         const pages = await crawlPage(baseUrl, baseUrl, {})

    //         const report = printReport(pages)

    //         res.json(report); // Send the report back to the client
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('An error occurred while crawling the website.');
    //     }
    // });

// 404 page
app.use((req, res) => {
res.status(404).render('404');
});









// { -> old package.json
//     "name": "test-jsdom",
//     "version": "1.0.0",
//     "description": "",
//     "main": "main.js",
//     "scripts": {
//       "start": "node --no-warnings main.js",
//       "test": "jest"
//     },
//     "author": "",
//     "license": "ISC",
//     "devDependencies": {
//       "jest": "^29.7.0"
//     },
//     "dependencies": {
//       "jsdom": "^23.2.0",
//       "node-fetch": "^3.3.2"
//     }
//   }