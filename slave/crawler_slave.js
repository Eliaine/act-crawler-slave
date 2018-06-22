const Queue = require('./scripts/Queue')
const Sitemap = require('./scripts/Sitemap')
const InMemoryStore = require('./scripts/InMemoryStore')
const Scraper = require('./scripts/Scraper')
const debug = require('debug')('act-crawler-slave:crawler_slave')
const JSDOMBrowser = require('./scripts/JSDOMBrowser')
const ChromeHeadlessBrowser = require('./scripts/ChromeHeadlessBrowser')
/**
 *
 * @param sitemap
 * @param options
 * @param options.browser jsdom|headless
 * @param options.pageLoadDelay
 * @param options.delay
 * @return {*}
 */
 
var crawler_slave = function () {
	this.state = 0;
}

crawler_slave.prototype = {
	scrape:function(sitemapInfo,options) {
		this.state = 1;
		return new Promise(function (resolve, reject) {
		// sitemap is created twice, once in node another in the browser context.
		// In node we don't actually need these variables.
		const fakeWindow = {}
		const fakeDocument = {}
		const fake$ = {}
		const q = new Queue()
		const store = new InMemoryStore()
		const sitemap = new Sitemap(sitemapInfo, {$: fake$, document: fakeDocument, window: fakeWindow})

		let BrowserConstructor
		switch (options.browser) {
		  case 'jsdom':
			BrowserConstructor = JSDOMBrowser
			debug('Jsdom browser selected')
			break
		  case 'headless':
			BrowserConstructor = ChromeHeadlessBrowser
			debug('Chrome headless browser selected')
			break
		  default:
			debug('No browser requested so jsdom was selected as default')
			BrowserConstructor = JSDOMBrowser
		}
		const browser = new BrowserConstructor({
		  pageLoadDelay: options.pageLoadDelay || 2000
		})
		const s = new Scraper({
		  queue: q,
		  sitemap,
		  browser,
		  store,
		  delay: options.delay || 500
		}, {})
		s.run(function () {
		  // TODO there should be some error handling here
		  resolve(store.data);
		  this.state = 0;
		})
	  })
	},
	getState:function(){
		return this.state;
	}	
}

module.exports = crawler_slave
