const genericAnswer = {
  time: {
    questionPageLoadAt: '2022-08-14T08:31:25.825Z',
    startAt: '2022-08-14T08:31:29.872Z',
    submitedAt: '2022-08-14T08:31:37.793Z',
    surveyLoadAt: '2022-08-14T08:31:25.807Z',
  },
  status: 'pilot',
  surveyId: 'x6bCKmDKeYpXtng8897l',
}

export const quadratic = {
  ...genericAnswer,
  leftCredits: 28,
  questions: [
    { id: 'Q1', vote: 5, credits: 25, order: 0 },
    { id: 'Q2', vote: 0, credits: 0, order: 1 },
    { id: 'Q3', vote: 0, credits: 0, order: 2 },
  ],
}

export const likert = {
  ...genericAnswer,
  researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
  questions: [
    { id: 'L1', item: [{ vote: 1 }, { vote: 2 }, { vote: 3 }] },
    { id: 'L2', item: [{ vote: 1 }, { vote: 2 }] },
  ],
}

export const conjoint = {
  ...genericAnswer,
  questions: [
    {
      attributes: [
        { name: 'att 1', key: 'attribute0' },
        { name: 'att 2', key: 'attribute1' },
        { name: 'att 3', key: 'attribute2' },
      ],
      items: [
        { attribute1: 'item 2', attribute0: 'item 1', id: 'C1-item1', attribute2: 'item 3' },
        { attribute1: 'item 5', attribute0: 'item 4', id: 'C1-item2', attribute2: 'item 6' },
      ],
      id: 'C1',
      selected: 'C1-item1',

      statement:
        '{"blocks":[{"key":"1ro82","text":"question 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',

      researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
    },
  ],
}
