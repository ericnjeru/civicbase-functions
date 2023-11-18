const admin = require('firebase-admin')
const fs = require('fs')

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
function fetchSurveyData() {
  // Firestore collection reference
  const surveysCollectionRef = admin.firestore().collection('surveys')

  // Specify the survey IDs you want to export
  const specificSurveyIds = ['Qp6WjogbEMiTQDDh7GNg']

  // Fetch data for specific survey IDs
  const surveysData = []

  specificSurveyIds.forEach((surveyId) => {
    const surveyDocRef = surveysCollectionRef.doc(surveyId)
    surveyDocRef
      .get()
      .then((surveyDoc) => {
        if (surveyDoc.exists) {
          const surveyData = {
            surveyId,
            answers: [],
            access: [],
            respondents: [],
          }

          // Fetch data from the "answers" subcollection
          const answersCollectionRef = surveyDocRef.collection('answers')
          answersCollectionRef
            .get()
            .then((answersQuerySnapshot) => {
              answersQuerySnapshot.forEach((answerDoc) => {
                surveyData.answers.push(answerDoc.data())
              })

              // Fetch data from the "access" subcollection
              const accessCollectionRef = surveyDocRef.collection('access')
              accessCollectionRef
                .get()
                .then((accessQuerySnapshot) => {
                  accessQuerySnapshot.forEach((accessDoc) => {
                    surveyData.access.push(accessDoc.data())
                  })

                  // Fetch data from the "respondents" subcollection
                  const respondentsCollectionRef = surveyDocRef.collection('respondents')
                  respondentsCollectionRef
                    .get()
                    .then((respondentsQuerySnapshot) => {
                      respondentsQuerySnapshot.forEach((respondentDoc) => {
                        surveyData.respondents.push(respondentDoc.data())
                      })

                      surveysData.push(surveyData)
                      if (surveysData.length === specificSurveyIds.length) {
                        // Write data to a JSON file
                        fs.writeFileSync('export.json', JSON.stringify(surveysData))
                        console.log('Data exported successfully!')
                      }
                    })
                    .catch((respondentsError) => {
                      console.error('Error fetching respondents:', respondentsError)
                    })
                })
                .catch((accessError) => {
                  console.error('Error fetching access:', accessError)
                })
            })
            .catch((answersError) => {
              console.error('Error fetching answers:', answersError)
            })
        } else {
          console.log(`Survey with ID ${surveyId} not found.`)
        }
      })
      .catch((surveyError) => {
        console.error(`Error fetching survey ${surveyId}:`, surveyError)
      })
  })
}

// Create a function to convert a date object to ISO 8601 format
const formatDate = (date) => new Date(date).toISOString()

// Create a function to wrap a value in quotes if it contains a comma
const wrapInQuotesIfNeeded = (value) => (value ? (value?.includes(',') ? `"${value}"` : value) : value)

function exportSurveyResultsToCsv() {
  const json = require('../export.json')
  // Define CSV headers
  const surveyResultsCsvHeaders = [
    'identifier',
    'createdAt',
    'surveyId',
    'currentObservation',
    'defaultAnswer',
    'cost',
    'userVotes',
    'credits',
    'vote',
    'order',
    'leftCredits',
    'observationLoadAt',
    'surveyLoadAt',
    'submitedAt',
    'questionPageLoadAt',
    'startAt',
  ]

  // Convert JSON data to CSV format
  const surveyResultsCsvData = [surveyResultsCsvHeaders.join(',')]

  json.forEach((survey) => {
    survey?.answers?.forEach((answer) => {
      answer?.observations?.forEach((observation) => {
        observation.questions.forEach((question) => {
          const row = [
            answer.identifier,
            formatDate(answer.createdAt),
            answer.surveyId,
            observation.currentObservation,
            question.defaultAnswer,
            question.cost,
            question.userVotes,
            question.credits,
            question.vote,
            question.order,
            observation.leftCredits,
            formatDate(observation.time.observationLoadAt),
            formatDate(observation.time.surveyLoadAt),
            formatDate(observation.time.submitedAt),
            formatDate(observation.time.questionPageLoadAt),
            formatDate(observation.time.startAt),
          ]
          surveyResultsCsvData.push(row.join(','))
        })
      })
    })
  })

  // Write CSV data to a file
  fs.writeFileSync('survey_results.csv', surveyResultsCsvData.join('\n'))
  console.log('Survey results CSV export completed successfully!')
}

function exportSurveyAccessToCsv() {
  const json = require('../export.json')
  // Define CSV headers
  const surveyAccessCsvHeaders = [
    'continent',
    'country',
    'country_geoname_id',
    'city',
    'city_geoname_id',
    'timezone_name',
    'timezone_gmt_offset',
    'timezone_abbreviation',
    'timezone_current_time',
    'timezone_is_dst',
    'latitude',
    'ip_address',
    'region_iso_code',
    'country_code',
    'security_is_vpn',
    'connection_isp_name',
    'connection_connection_type',
    'connection_organization_name',
    'connection_autonomous_system_organization',
    'connection_autonomous_system_number',
    'region',
    'postal_code',
    'longitude',
    'status',
  ]

  // Convert JSON data to CSV format
  const surveyAccessCsvData = [surveyAccessCsvHeaders.join(',')]

  json.forEach((survey) => {
    survey?.access?.forEach((access) => {
      const row = [
        access.continent,
        access.country,
        access.country_geoname_id,
        access.city,
        access.city_geoname_id,
        access?.timezone?.name,
        access?.timezone?.gmt_offset,
        access?.timezone?.abbreviation,
        access?.timezone?.current_time,
        access?.timezone?.is_dst,
        access.latitude,
        access.ip_address,
        access.region_iso_code,
        access.country_code,
        access?.security?.is_vpn,
        wrapInQuotesIfNeeded(access?.connection?.isp_name),
        wrapInQuotesIfNeeded(access?.connection?.connection_type),
        wrapInQuotesIfNeeded(access?.connection?.organization_name),
        wrapInQuotesIfNeeded(access?.connection?.autonomous_system_organization),
        access?.connection?.autonomous_system_number,
        wrapInQuotesIfNeeded(access.region),
        access.postal_code,
        access.longitude,
        access.status,
      ]
      surveyAccessCsvData.push(row.join(','))
    })
  })

  // Write CSV data to a file
  fs.writeFileSync('survey_access.csv', surveyAccessCsvData.join('\n'))
  console.log('Survey access CSV export completed successfully!')
}

function exportSurveyRespondendtsToCsv() {
  const json = require('../export.json')
  // Define CSV headers
  const surveyRespondendtsCsvHeaders = [
    'continent',
    'country',
    'country_geoname_id',
    'city',
    'city_geoname_id',
    'timezone_name',
    'timezone_gmt_offset',
    'timezone_abbreviation',
    'timezone_current_time',
    'timezone_is_dst',
    'latitude',
    'ip_address',
    'region_iso_code',
    'country_code',
    'security_is_vpn',
    'connection_isp_name',
    'connection_connection_type',
    'connection_organization_name',
    'connection_autonomous_system_organization',
    'connection_autonomous_system_number',
    'region',
    'postal_code',
    'longitude',
    'status',
  ]

  // Convert JSON data to CSV format
  const surveyRespondendtsCsvData = [surveyRespondendtsCsvHeaders.join(',')]

  json.forEach((survey) => {
    survey?.respondents?.forEach((respondent) => {
      const row = [
        respondent.continent,
        respondent.country,
        respondent.country_geoname_id,
        respondent.city,
        respondent.city_geoname_id,
        respondent?.timezone?.name,
        respondent?.timezone?.gmt_offset,
        respondent?.timezone?.abbreviation,
        respondent?.timezone?.current_time,
        respondent?.timezone?.is_dst,
        respondent.latitude,
        respondent.ip_address,
        respondent.region_iso_code,
        respondent.country_code,
        respondent?.security?.is_vpn,
        wrapInQuotesIfNeeded(respondent?.connection?.isp_name),
        wrapInQuotesIfNeeded(respondent?.connection?.connection_type),
        wrapInQuotesIfNeeded(respondent?.connection?.organization_name),
        wrapInQuotesIfNeeded(respondent?.connection?.autonomous_system_organization),
        respondent?.connection?.autonomous_system_number,
        wrapInQuotesIfNeeded(respondent.region),
        respondent.postal_code,
        respondent.longitude,
        respondent.status,
      ]
      surveyRespondendtsCsvData.push(row.join(','))
    })
  })

  // Write CSV data to a file
  fs.writeFileSync('survey_respondents.csv', surveyRespondendtsCsvData.join('\n'))
  console.log('Survey Respondendts CSV export completed successfully!')
}

function exportSurveyRespondentsNamesToCsv() {
  const json = require('../export.json')
  // Define CSV headers
  const surveyResultsCsvHeaders = ['identifier']

  // Convert JSON data to CSV format
  const surveyResultsCsvData = [surveyResultsCsvHeaders.join(',')]

  const names = []
  json.forEach((survey) => {
    survey?.answers?.forEach((answer) => {
      if (!names.includes(answer.identifier)) {
        const row = [answer.identifier]
        surveyResultsCsvData.push(row.join(','))
        names.push(answer.identifier)
      }
    })
  })

  // Write CSV data to a file
  fs.writeFileSync('survey_respondents_names.csv', surveyResultsCsvData.join('\n'))
  console.log('Survey respondents names CSV export completed successfully!')
}
//fetchSurveyData()
// exportSurveyResultsToCsv()
// exportSurveyAccessToCsv()
// exportSurveyRespondendtsToCsv()
exportSurveyRespondentsNamesToCsv()
