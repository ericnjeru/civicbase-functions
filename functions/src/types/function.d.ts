import * as functions from 'firebase-functions'

export interface Request extends functions.https.Request {
  headers: {
    authorization?: string
  }
  user: {
    uid: string
    email?: string
    token: string
  }
}

export interface Response extends functions.Response {}
