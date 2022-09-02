import 'dotenv/config'
import request from 'supertest'
import * as survey from './utils/survey'

describe('Conjoint', () => {
  let surveyId: string | null = null

  it('create', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .post('survey')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .send(survey.conjoint)
      .then((response) => {
        surveyId = response.body

        expect(response.status).toBe(201)
        expect(response.body).toBeDefined()
      })
  })

  it('update', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .put(`survey/${surveyId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .send({ ...survey.conjoint, setup: { ...survey.conjoint.setup, topic: '[Jest][Updated] Conjoint test' } })
      .then((response) => {
        expect(response.status).toBe(201)
        expect(response.body).toBe(surveyId)
      })
  })

  it('publish', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .get(`publishSurvey/${surveyId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Published')
      })
  })

  it('finish', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .get(`finishSurvey/${surveyId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Finished')
      })
  })

  it('clone', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .get(`cloneSurvey/${surveyId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .then((response) => {
        expect(response.status).toBe(201)
        expect(response.body.setup.topic).toContain('clone')
        expect(response.status).not.toBe(surveyId)
      })
  })

  it('analytics', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .get(`surveyAnalytics/${surveyId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .then((response) => {
        const { survey, csv, results } = response.body

        expect(response.status).toBe(200)
        expect(survey).toBeDefined()
        expect(csv).toBeDefined()
        expect(results).toBeDefined()
      })
  })

  it('delete', async () => {
    await request(process.env.TEST_BASE_ENDPOINT)
      .delete(`survey/${surveyId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .set('credentials', 'include')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Deleted.')
      })
  })
})
