function printReport(pages){

    console.log('=========')
    console.log('REPORT')
    console.log('=========')

    const sortedPages = sortPage(pages)
    for (const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`found ${hits} link to page: ${url}`)
    }

    console.log('=========')
    console.log('REPORT')
    console.log('=========')
}

function sortPage(pages){
    const pagesArr = Object.entries(pages) // this takes the object and turns it into an array of arrays
    pagesArr.sort((a,b) =>{
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1] 

    }) // this sorts the array of arrays by the second element in each array
    return pagesArr
}

module.exports = {
    sortPage,
    printReport
}