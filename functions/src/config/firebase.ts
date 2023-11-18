import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import * as authentication from 'firebase/auth'

const config = {
  apiKey: 'AIzaSyA-Go5-5idQJLEkKrLMMiI05GrLdXbhdkY',
  authDomain: 'civicbase-functions.firebaseapp.com',
  projectId: 'civicbase-functions',
  storageBucket: 'civicbase-functions.appspot.com',
  messagingSenderId: '436253743444',
  appId: '1:436253743444:web:6413c855468652795510c1',
  measurementId: 'G-ER5NGED7PF',
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'civicbase-functions',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGKh+fKWKdmDBl\nI6unEzdgpJ15hE7H4JTJDONT+/RCiltyCmjXpgiSZslhYvFW95vNsom/uSKnlSvJ\nxmmXyAHFo9eeAITJ0R5EdYVyaRZsWv439mb4dd/4ZMNGxygiKkslCBOwjZdCix52\nE48FiiGl1dnyp5d+WO3QTDc4buLwHzbP5F7EKPNp37nRGTCft3anviOhCxzRVUrG\np6L/VuDeGLjKkR0asWJZptrjdMSBczX28rWOQNQ/wjbpHZDFWAkSqNjB2pJVIEVe\n4X7H9UkD5Rs5vrqv8cFyeCfAlCcmj2O+LeB1VHzdfcL5ST+clm6leD++SlvuPji0\nDGqK5eMFAgMBAAECggEAEDHBec4pBMk6+aXFN/2TCS8KvrNR7A9UOWxeaGIIksBT\nbtA49zHWm36sHTnq9sXiq36LhINXUkV98zRnmeoHcwsyHY1CgASHkH95YC5qxBol\n+Mhs0js+PXXTaF8lAX3EiSQBPLlyT61AC26kjoa8vALsMWKbnjPoSdCHGfG97AxY\n9a3sdbtUzLUHY0bSALZ3xyLtkWhMr4wq2mxpn4Y7nm4UM2Iq7mQtGm66p4PZJaSF\n9nHik3VY2/xzzwDRntw9PzkPOiPiX7NCQpoRfpa57xlhoWL90dHTik6QaWV1aMa+\nqs6yTW6UVgJcwcl0qzTnFyYxAZwSW2gVSOSRr5xRtQKBgQDnBwUfcBQeIy95Dbch\ncr1tNxRCdtHNQvaIwigxaY8HK3F7TICyQl7tFkfXUIUFD+HdQZivY5DZMwtEQWa7\nBlfXGE2ZLxLvOGFLnfKVbGcggO96PFRoJ1Br0h67sEJDiMbpPq7DH8t8+mpofIPm\nslPGzdg/HTY4o3Ozxom9FaAuCwKBgQDblbk4v6rAh5kCPM9yjWIZidkx+faPbpdQ\nLkVMl4l3X3+CLRXNtrR4LbApj+4LEPkPTP7QT1fVlplNq7CSeuT2x/i5LsUqUPgg\nJILEbPjeHdTGg2wtOypgB9Ge2NAO5D2S1G+8vvwP3xWhWyiEbZCLLgMq6+E74EPd\nuD229iCtLwKBgDnj0m7MQN5EZtLokuj4vWqukI8PAwdyLiCatkObddGQG0GQK/d/\nFhZGrP3RGWPpVOmCVGYuhs9GMR6LXNikgEJPvrIRz6bN8+Nk0rKKlVTZuihhEa1/\nnHFIF5dkVVZi4aT0pgoS34STozJHcS3PpZp9XiCCi2Gp44Y6y6zrzFV9AoGBALS3\n772tuOlFb/8wbwb3J0Kfedqwv2RifzPlMPGNUfyl4voPAv/QG41BBNff9eizqlcW\nZiyo8D//9uG+qM6VSDV2dNRrkqd2Bg/mHJ1ulg+v+3r5lKFRLVnldXbHN8zZuXdL\nUT7E7Axf7Jxkut7qkWiKkN7VTQSLWS90P46B2HjPAoGBAMxbJpK9EYRaDg02Yjx+\nDBjEUO+VbPaQRACZZWuqmwHNGJcKis5mFHWSbNH5QMAq6b7c19WNw2r1u6HNLkA6\nRjRa7koYAp4j1wM2iezH5gJuau+BML8XAuDwDq8Qk7DVfRMEg6mRbFoxFIQaw+8F\nArJr8o+dojTr7fx6aCQueXym\n-----END PRIVATE KEY-----\n'.replace(
        /\\n/g,
        '\n',
      ),
    clientEmail: 'firebase-adminsdk-x52bq@civicbase-functions.iam.gserviceaccount.com',
  }),
  databaseURL: 'https://civicbase-functions.firebaseio.com',
  projectId: 'civicbase-functions',
})

const app = firebase.initializeApp(config)
const auth = authentication.initializeAuth(app)

const db = admin.firestore()

export { admin, db, firebase, config, auth }
