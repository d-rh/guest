const request = require("request")
const URL = 'http://localhost:3005/'

describe('Guestbook Test Suite', () => {
  
  describe('Index Route Test Suite', () => {
    it('returns status code 200', () => {
      request.get(URL, (err, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
    it('responds with an html doc', () => {
      request.get(URL, (err, response, body) => {
        expect(response.headers.content-type).toBe('text/html; charset=utf-8')
      })
    })
  })
  describe('Register Route Test Suite', () => {
    
  })
})