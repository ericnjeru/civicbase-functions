import * as functions from 'firebase-functions'
import { Request, Response } from '../../../types/function'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { middleware } from '../../../services/auth'
import { params } from '../../../utils/params'

const uploadRecord = (req: Request, res: Response) => {
  const fileId = params(req)
  const file: Blob = req.body
  const metadata = {
    contentType: 'audio/ogg; codecs=opus',
  }
  const storage = getStorage()
  const storageRef = ref(storage, `records/${fileId}.ogg`)

  uploadBytes(storageRef, file, metadata)
    .then(() => res.status(201).json({ fileId }))
    .catch((error) => {
      functions.logger.error('Upload record', error)
      return res.status(500).json(error)
    })
  // .then(() => {
  //   return getDownloadURL(storageRef).then((downloadUrl) => res.status(201).json({ fileId, downloadUrl }))
  // })
}

export default functions.https.onRequest(middleware(uploadRecord, { method: 'POST' }))
