import { Request } from 'express'
import * as functions from 'firebase-functions'
import { db } from '../config/firebase'
import axios from 'axios'

export const getIp = (req: Request, collection: string) => {
  const { surveyId } = req.params
  const IP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.headers['fastly-client-ip']

  if (IP) {
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=e28855b523284c2589f6c61bd0225ebf&ip_address=${IP}&fields=ip_address,city,city_geoname_id,region,region_iso_code,postal_code,country,country_code,country_geoname_id,continent,longitude,latitude,security,timezone,connection`,
      )
      .then((response) => {
        db.collection('surveys').doc(surveyId).collection(collection).add(response.data)
      })
      .catch((error) => {
        functions.logger.error('GET IP GEOLOCATION', error)
        db.collection('surveys').doc(surveyId).collection(collection).add({
          ip: 'ERROR',
        })
      })
  } else {
    functions.logger.info('IP NOT FOUND')

    db.collection('surveys').doc(surveyId).collection(collection).add({
      ip: 'NOT FOUND',
    })
  }
}
