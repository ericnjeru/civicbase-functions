import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { createAnswer } from './on-create'

const app = express()

app.use(cors({ origin: true, credentials: true }))

app.post('/', createAnswer)

export default functions.https.onRequest(app)
