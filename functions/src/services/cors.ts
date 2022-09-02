import cors from 'cors'
import * as functions from 'firebase-functions'

const corsHandler = cors({ origin: true, credentials: true })

export const corsMiddleware =
  (handler: (req: functions.https.Request, res: functions.Response) => void) =>
  (req: functions.https.Request, res: functions.Response) => {
    return corsHandler(req, res, () => {
      return handler(req, res)
    })
  }
