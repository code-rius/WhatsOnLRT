let request = require("request");
let cheerio = require("cheerio");
let express = require("express");
let router = express.Router();

router.get("/", function(req, res, next) {
    // Send a request to lrt-televizija
    request('https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija', (error, response, html) => {
        // If request doens't return an error - perform scraping
        if (!error && response.statusCode == 200) {
            // Array variable to hold information about each TV program
            const channels = [];
            // HTML from requested webpage
            const $ = cheerio.load(html);
            // Iterage every item in banner "Tiesiogiai"
            $('.channel-item', '#tvprog').each((i, el) => {
                // Assign temporary values for each instance of a TV program
                let time = $(el).find('.data-block__text').text();
                let title = $(el).find('.channel-item__title').text();
                let channel = $(el).find('.channel-item__link').attr('href');
                // Extrapolate chanel name from chanel URL
                channel = channel.replace('/mediateka/tiesiogiai/', '');
                // Bundle all temporary values into a JS objects
                let program = { Time: time, Title: title, Channel: channel };
                // Push JS objecto onto "channels" array.
                channels.push(program);
            });
            // Stringify data, so it is no longer in array filled with objects
            var myJSON = JSON.stringify(channels);
            // Send data
            res.send(myJSON);
        }
    });
});

module.exports = router;