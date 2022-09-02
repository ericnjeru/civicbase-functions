import 'dotenv/config'
import request from 'supertest'
import * as survey from './utils/survey'

describe('survey', () => {
  describe('dasboard', () => {
    let qvSurveyId: string | null = null
    let likertSurveyId: string | null = null
    let conjointSurveyId: string | null = null

    beforeAll(async () => {
      await request(process.env.TEST_BASE_ENDPOINT)
        .post('survey')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .send(survey.quadratic)
        .then((response) => {
          qvSurveyId = response.body
        })

      await request(process.env.TEST_BASE_ENDPOINT)
        .post('survey')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .send(survey.likert)
        .then((response) => {
          likertSurveyId = response.body
        })

      await request(process.env.TEST_BASE_ENDPOINT)
        .post('survey')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .send(survey.conjoint)
        .then((response) => {
          conjointSurveyId = response.body
        })
    })

    it('get all surveys from a user', async () => {
      await request(process.env.TEST_BASE_ENDPOINT)
        .get('surveys')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .then((response) => {
          const surveys = response.body

          expect(surveys.length).toBeGreaterThanOrEqual(3)
          expect(response.status).toBe(200)

          const conjoit = surveys.find(({ id }: { id: string }) => id === conjointSurveyId)
          const quadratic = surveys.find(({ id }: { id: string }) => id === qvSurveyId)
          const likert = surveys.find(({ id }: { id: string }) => id === conjointSurveyId)

          expect(conjoit).toBeDefined()
          expect(quadratic).toBeDefined()
          expect(likert).toBeDefined()
        })
    })

    it('get a survey', async () => {
      await request(process.env.TEST_BASE_ENDPOINT)
        .get(`survey/${qvSurveyId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .then((response) => {
          expect(response.body.id).toBe(qvSurveyId)
        })

      await request(process.env.TEST_BASE_ENDPOINT)
        .get(`survey/${likertSurveyId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .then((response) => {
          expect(response.body.id).toBe(likertSurveyId)
        })

      await request(process.env.TEST_BASE_ENDPOINT)
        .get(`survey/${conjointSurveyId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .set('credentials', 'include')
        .then((response) => {
          expect(response.body.id).toBe(conjointSurveyId)
        })
    })
  })
})
