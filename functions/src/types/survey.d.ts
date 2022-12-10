type Features = {
  multipleAnswerFromSameSource?: boolean
}

export enum Jargon {
  AGREE_DISAGREE = 'Agree/Disagree',
  FAVOR_OPPOSE = 'Favor/Oppose',
  APPROVE_REJECT = 'Aprove/Reject',
  AYE_NAY = 'Aye/Nay',
  CUSTOM = 'Custom',
}

export enum Token {
  CREDITS = 'Credits',
  COINS = 'Coins',
  TOKENS = 'Tokens',
  CUSTOM = 'Custom',
}

export enum Methods {
  QUADRATIC = 'Quadratic',
  CONJOINT = 'Conjoint',
  LIKERT = 'Likert',
}

export enum MethodPreference {
  DIAMOND = 'diamond',
  RADIUS = 'radius',
}

export enum Status {
  PILOT = 'pilot',
  PUBLISHED = 'published',
  FINISHED = 'finished',
}

type Language = {
  jargon: Jargon
  thumbsDown: string
  thumbsUp: string
  token: Token
}

type Message = {
  completion?: string
  welcome?: string
}

type Feedback = {
  active: boolean
  questions: {
    id: string
    questions: string
  }[]
}

type Setup = {
  credits?: number
  feedback?: Feedback
  method: Methods
  methodPreference?: MethodPreference
  topic: string
}

type QuadraticQuestions = {
  id: string
  statement: string
}

type LikertQuestions = {
  id: string
  items: { description: string }[]
  statement: string
}

type ConjointQuestions = {
  attributes: { key: string; name: string }[]
  id: string
  items: {
    [key: string]: string
    id: string
  }[]
  statement: string
}

interface SurveyBase {
  createdAt: string
  features?: Features
  message?: Message
  setup: Setup
  status: Status
  uid: string
}

// export interface Survey2<Method extends Methods> {
//   createdAt: string
//   features?: Features
//   message?: Message
//   setup: Setup
//   status: Status
//   uid: string
//   [key: Methods]: Method
// }

export interface Quadratic extends SurveyBase {
  language: Language
  quadratic: QuadraticQuestions[]
}

export interface Likert extends SurveyBase {
  likert: LikertQuestions[]
}

export interface Conjoint extends SurveyBase {
  conjoint: ConjointQuestions[]
}

// export type Survey<T = Quadratic | Likert | Conjoint> = T

export type Survey = Quadratic | Likert | Conjoint
