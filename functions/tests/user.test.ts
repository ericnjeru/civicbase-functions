import 'dotenv/config'
import request from 'supertest'

describe('user', () => {
  it('should get user profile', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .get('userProfile')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .then((response) => {
        expect(response.body.user.name).toBe(process.env.TEST_NAME)
        expect(response.body.user.email).toBe(process.env.TEST_EMAIL)
      })
  })
})
