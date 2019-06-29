const request = require ('request')
const cheerio = require ('cheerio')

let channels = [];

request('https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // const showTime = $('.data-block__text', '#tvprog').text();
        // const showTitle = $('.channel-item__title', '#tvprog').text();

        $('.channel-item', '#tvprog').each((i, el) => {
            let time = $(el).find('.data-block__text').text();
            let title = $(el).find('.channel-item__title').text();
            let channel = $(el).find('.channel-item__link').attr('href');
            channel = channel.match( /lrt.*$/ ,channel);

            var program = { Time: time, Title: title, Channel:channel};
            channels.push(program);
            console.log(time + '\t' + title + '\t'  + channel);
        });
    }
});
