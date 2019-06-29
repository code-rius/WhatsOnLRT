let request = require("request");
let cheerio = require("cheerio");
let express = require("express");
let router = express.Router();




router.get("/", function(req, res, next) {
    request('https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const channels = [];
            const $ = cheerio.load(html);

            // const showTime = $('.data-block__text', '#tvprog').text();
            // const showTitle = $('.channel-item__title', '#tvprog').text();

            $('.channel-item', '#tvprog').each((i, el) => {
                let time = $(el).find('.data-block__text').text();
                let title = $(el).find('.channel-item__title').text();
                let channel = $(el).find('.channel-item__link').attr('href');
                console.log(typeof channel);
                channel = channel.replace('/mediateka/tiesiogiai/', '');
                // channel = channel.match(/lrt.*$/, channel);

                let program = { Time: time, Title: title, Channel: channel };
                channels.push(program);
                // console.log(time + '\t' + title + '\t' + channel);
            });

            var myJSON = JSON.stringify(channels);
            console.log(myJSON);
            res.send(myJSON);
        }
    });

    var myObj = {
        channel: "LTR HD", 
        title: "Telemuno presenta", 
        time: "07:00 - 08:00"
    };

    

    // var myJSON = JSON.stringify(channels);
    // console.log(myObj);
    // res.send(myJSON);
});

module.exports = router;