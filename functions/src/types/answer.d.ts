export enum Status {
  PILOT = 'pilot',
  PUBLIAHED = 'published',
}

type Feedback = {
  answer: string
  id: string
}

type QuadraticQuestions = {
  credits: number
  id: string
  order: number
  vote: number
}

type Time = {
  questionPageLoadAt: string
  startAt: string
  submitedAt: string
  surveyLoadAt: string
}

export interface Answer {
  userId?: string
  suburb?: string
  createdAt: string
  feedback?: Feedback[]
  leftCredits?: number
  questions: QuadraticQuestions[]
  status: Status
  surveyId: string
  time: Time
  id?: string // does not come from DB
}
