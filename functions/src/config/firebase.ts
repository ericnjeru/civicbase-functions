import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyChPtHht6YV1TnZlQ54gvdE8kyfTZfuF_M',
  authDomain: 'civic-base.firebaseapp.com',
  projectId: 'civic-base',
  storageBucket: 'civic-base.appspot.com',
  messagingSenderId: '421351517108',
  appId: '1:421351517108:web:f731355f3bbaf00f49a0e1',
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: functions.config().project.id,
    privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
    clientEmail: functions.config().client.email,
  }),
  databaseURL: 'https://civic-base.firebaseio.com',
  projectId: 'civic-base',
})

firebase.initializeApp(config)

const db = admin.firestore()

export { admin, db, firebase, config }
