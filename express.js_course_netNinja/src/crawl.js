const {JSDOM} = require('jsdom');

async function crawlPage(baseUrl, currentURL, pages){

// baseUrl is the URL of the page we started crawling from
// currentURL is the URL of the page we are currently crawling
// pages is an object of all the pages we have crawled so far


    
    // in case you want to add the protocol to the URL if it is not there
    // if (!currentURL.startsWith('http://') && !currentURL.startsWith('https://')) {
    //     currentURL = 'https://' + currentURL;
    // }

    // if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    //     baseUrl = 'https://' + baseUrl;
    // }


    const baseURLObj = new URL(baseUrl)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages}


    // if we have already crawled this page, is gonna count how many times we have crawled it
    const normalizeCurrentURL = normalizeUrl(currentURL)

    if (pages[normalizeCurrentURL] > 0){
        pages[normalizeCurrentURL]++
        return pages 
    } 

    pages[normalizeCurrentURL] = 1

    console.log(`actively crawling ${currentURL}`)
    

    try{

        const resp = await fetch(currentURL)

        if (resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`non html response, content-type: ${contentType} on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        nextURLs = getURLsFromHTML(htmlBody, baseUrl)

        for (const nextURL of nextURLs){
            pages = await crawlPage(baseUrl, nextURL, pages)
        } // for each nextURL, we crawl the page, and then we crawl all the links in the page
        // this is a recursive function, it is gonna call itself, because we crawl the main page, and then we crawl all 
        //the links in the main page, and then we crawl all the links in the links in the main page, and so on

    } catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }    
    return pages
}

function getURLsFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody) // create a DOM object from the HTML string
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1) === '/') {
            // relative URL

            try {
                const urlObj = new URL(baseUrl + linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                // invalid URL
                console.log(`error with relative url: ${err.messsage}`)
            }
            

        } else {
            // absolute URL
            

            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }  catch (err) {
                // invalid URL
                console.log(`error with absolute url: ${err.messsage}`)
            }
            
        }
        
    }
    
    return urls
}


function normalizeUrl(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
      return hostPath.slice(0, -1)
    }
    return hostPath
  
  }
  
  module.exports = {
      normalizeUrl,
      getURLsFromHTML,
      crawlPage
  }

