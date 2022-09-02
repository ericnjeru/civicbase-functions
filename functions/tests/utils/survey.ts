import { admin, db } from '../../src/config/firebase'

export const genericSurvey = {
  features: {
    multipleAnswerFromSameSource: undefined,
    qualtrics: undefined,
    randomQuestions: undefined,
    userIdentification: undefined,
  },
  message: {
    completion:
      '{"blocks":[{"key":"2bhnl","text":"completion message","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    welcome:
      '{"blocks":[{"key":"ep58m","text":"welcome message","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  },
}

export const quadratic: any = {
  ...genericSurvey,
  language: {
    jargon: 'Agree/Disagree',
    thumbsDown: 'Disagree',
    thumbsUp: 'Agree',
    token: 'Credits',
  },
  quadratic: [
    {
      statement:
        '{"blocks":[{"key":"1ro82","text":"question 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
    {
      statement:
        '{"blocks":[{"key":"1ro82","text":"question 2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
    {
      statement:
        '{"blocks":[{"key":"1ro82","text":"question 3","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  ],
  setup: {
    credits: 100,
    method: 'Quadratic',
    topic: '[Jest] Quadratic test',
  },
}

export const likert: any = {
  ...genericSurvey,
  likert: [
    {
      statement:
        '{"blocks":[{"key":"1ro82","text":"question 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      items: [{ description: 'item 1' }, { description: 'item 2' }, { description: 'item 3' }],
    },
    {
      statement:
        '{"blocks":[{"key":"1ro82","text":"question 2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      items: [{ description: 'item 1' }, { description: 'item 2' }],
    },
  ],
  setup: {
    method: 'Likert',
    topic: '[Jest] Likert test',
  },
}

export const conjoint: any = {
  ...genericSurvey,
  conjoint: [
    {
      attributes: [
        { name: 'att 1', key: 'attribute0' },
        { name: 'att 2', key: 'attribute1' },
        { name: 'att 3', key: 'attribute2' },
      ],
      items: [
        { id: 0.44928008609433334, attribute0: 'item 1', attribute1: 'item 2', attribute2: 'item 3' },
        { id: 0.4203619658472899, attribute0: 'item 4', attribute1: 'item 5', attribute2: 'item 6' },
      ],
      statement:
        '{"blocks":[{"key":"1ro82","text":"question 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  ],
  setup: {
    method: 'Conjoint',
    topic: '[Jest] Conjoint test',
  },
}

export function incrementRespondent(surveyId: string, status: 'pilot' | 'published' | 'finished') {
  const survey = db.collection('surveys').doc(surveyId)

  if (status === 'pilot') {
    return survey.update({
      'analytics.pilot.current.respondents': admin.firestore.FieldValue.increment(1),
    })
  } else {
    return survey.update({
      'analytics.published.current.respondents': admin.firestore.FieldValue.increment(1),
    })
  }
}
