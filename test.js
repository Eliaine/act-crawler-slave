const crawler_slave = require('./slave/crawler_slave')
const sitemap = {"name":"网贷天眼","startUrl":"https://www.p2peye.com/forum-60-1.html","selectors":[{"parentSelectors":["_root"],"type":"SelectorElement","multiple":true,"id":"baoguang","name":"平台曝光","selector":"li.ui-forumlist-item","delay":""},{"parentSelectors":["baoguang"],"type":"SelectorText","multiple":false,"id":"title","name":"标题","selector":"div.ui-forumlist-title a","regex":"","delay":""},{"parentSelectors":["baoguang"],"type":"SelectorText","multiple":false,"id":"author","name":"作者","selector":"div.ui-forumlist-info a","regex":"","delay":""},{"parentSelectors":["baoguang"],"type":"SelectorText","multiple":false,"id":"posttime","name":"发表时间","selector":"div.ui-forumlist-info > span:nth-of-type(2)","regex":"","delay":""},{"parentSelectors":["baoguang"],"type":"SelectorText","multiple":false,"id":"viewcount","name":"浏览数","selector":"div.qt-gr span:nth-of-type(1)","regex":"\\d+","delay":""},{"parentSelectors":["baoguang"],"type":"SelectorText","multiple":false,"id":"commentcount","name":"回复数","selector":"div.qt-gr span:nth-of-type(3)","regex":"\\d+","delay":""}],"_id":"86e781e043c73cb60c67bb35e4992dab"};
const options = {delay: 10, pageLoadDelay: 10, browser: 'headless'} // optional delay, pageLoadDelay and browser
const webscraper = new crawler_slave();
var state = webscraper.getState();

console.log(state)
webscraper.scrape(sitemap, options)
    .then(function (scraped) {
        // This is your scraped info
		console.log(scraped);
    })