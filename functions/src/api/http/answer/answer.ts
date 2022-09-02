import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { createAnswer } from './on-create'
import { createIndiaAnswer } from './on-create-india'

const app = express()

app.use(cors({ origin: true, credentials: true }))

app.post('/', createAnswer)
app.post('/india', createIndiaAnswer)

export default functions.https.onRequest(app)
