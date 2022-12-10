import { Answer } from '../types/answer'
import { Survey } from '../types/survey'

const userId = ['userid', 'userId', 'userID']

type Field = {
  value: string
  label: string
}

// get questions order
const getOrder = (answer: Answer) =>
  answer.questions.map((_a, index) => ({ value: `questions[${index}].id`, label: `S${index + 1}` }))

// get questions ids
const getIds = (answer: Answer) =>
  answer.questions
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((question, index) => ({ value: `questions[${index}].vote`, label: question.id }))

const userHasId = (answers: Answer[]) => {
  let flag = false
  answers.forEach((answer) => {
    userId.forEach((id) => {
      if (answer[id]) {
        flag = true
      }
    })
  })

  return flag
}

const userHasSuburb = (answers: Answer[]) => {
  let flag = false
  answers.forEach((answer) => {
    if (answer.suburb) {
      flag = true
    }
  })

  return flag
}

export const getFields = (survey: Survey, answers: Answer[]) => {
  const answer = answers[0]
  const fields: Field[] = []

  if (userHasId(answers)) {
    fields.push({ value: 'userId', label: 'user id' })
  }

  if (userHasSuburb(answers)) {
    fields.push({ value: 'suburb', label: 'suburb' })
  }

  fields.push(...getIds(answer))
  fields.push(...getOrder(answer))
  fields.push({ value: 'createdAt', label: 'created at' })
  fields.push({ value: 'time.surveyLoadAt', label: 'survey loaded at' })
  fields.push({ value: 'time.startAt', label: 'started at' })
  fields.push({ value: 'time.questionPageLoadAt', label: 'questions started at' })
  fields.push({ value: 'time.submitedAt', label: 'subitted at' })
  fields.push({ value: 'leftCredits', label: 'credit left' })

  if (survey.setup.feedback?.active) {
    survey.setup.feedback.questions.forEach((question, index) => {
      fields.push({ value: `feedback[${index}].answer`, label: question.id })
    })
  }

  return fields
}
