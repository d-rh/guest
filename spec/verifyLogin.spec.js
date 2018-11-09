const verifyLogin = require('../functions/verifyLogin');

describe('verifyLogin', () => {
  it('should resolve to "Not Authenticated" when the user does not exist', (done) => {
    verifyLogin(null)
      .then( login => {
        expect(login.result).toBe('NOT_AUTHENTICATED');
        done();
      })
  });
  it('should resolve to an authenticated user when the user does exist', (done) => {
    verifyLogin({
      username: 'test-user',
      password: 'testing'
    }).then(login => {
      console.info(login)
      expect(login.result).toBe("AUTHENTICATED");
      done();
    })
  })
});

