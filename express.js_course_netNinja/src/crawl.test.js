// Jest automatically search for files with .test.js or .spec.js extension

const {normalizeUrl, getURLsFromHTML} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol', () => {
    const input ='https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash', () => {
    const input ='https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capital', () => {
    const input ='https://BLOG.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http', () => {
    const input ='http://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

// an absolute url is a url that includes the protocol and domain

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody =`
    <html>
        <body>
          <a href="https://blog.boot.dev/">boot.dev Blog</a>
        <body>
    </html>`

    const inputBaseUrl = 'https://blog.boot.dev/'


    const actual = getURLsFromHTML(inputHTMLBody ,inputBaseUrl)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

// a relative url is a url that does not include the protocol and domain, just the path

test('getURLsFromHTML relative', () => {
    const inputHTMLBody =`
    <html>
        <body>
          <a href="/path/">boot.dev Blog</a>
        <body>
    </html>`

    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody ,inputBaseUrl)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML relative & absolute', () => {
    const inputHTMLBody =`
    <html>
        <body>
          <a href="/path1/">boot.dev Blog</a>
          <a href="https://blog.boot.dev/path2/">boot.dev Blog</a>
        <body>
    </html>`

    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody ,inputBaseUrl)
    const expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody =`
    <html>
        <body>
          <a href="invalid">Invalid URL</a>
        <body>
    </html>`

    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody ,inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})