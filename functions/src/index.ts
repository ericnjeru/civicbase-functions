import * as auth from './api/http/auth'
import * as user from './api/http/users'
import * as svy from './api/http/survey'
import * as aswer from './api/http/answer'
import * as storage from './api/http/storage'
import * as surveyOverview from './api/http/overview'

// AUTH
export const login = auth.login
export const signup = auth.signup
export const resetPassword = auth.resetPassword
export const logout = auth.logout

// USER
export const userProfile = user.userProfile

// SURVEY
export const surveys = svy.surveys
export const cloneSurvey = svy.clone
export const finishSurvey = svy.finish
export const publishSurvey = svy.publish

// SURVEY CRUD
export const survey = svy.CRUD

// ANSWER
export const answer = aswer.answer

// STORAGE
export const updaloadRecord = storage.updaloadRecord

// OVERVIEW
export const overview = surveyOverview.overview
export const csv = surveyOverview.csv
