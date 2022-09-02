export function getResults(survey: any, answers: any) {
  switch (survey.setup.method) {
    case 'Quadratic':
      return calculateQuadratic(answers as any)

    case 'Conjoint':
      return calculateConjoint()

    case 'Likert':
      return calculateLikert(survey, answers as any)
  }
}

const calculateConjoint = () => {
  return []
}

const calculateLikert = (survey: any, answers: any) => {
  const resultMatrix = survey.likert?.map((question: any) => {
    const matrix: number[][] = []

    question.items.forEach(() => {
      matrix.push([0, 0, 0, 0, 0])
    })

    return matrix
  })

  if (resultMatrix) {
    answers.forEach((answer: any) => {
      answer.questions.forEach((question: any, questionIndex: any) => {
        question.item.forEach((item: any, itemIndex: any) => {
          resultMatrix[questionIndex][itemIndex][item.vote - 1]++
        })
      })
    })
  }

  return resultMatrix || []
}

const calculateQuadratic = (answers: any) => {
  return answers.reduce(
    (results: any, answer: any) => {
      answer.questions.forEach((question: any) => {
        if (question.id) {
          results[answer.status][question.id] = results[answer.status][question.id]
            ? results[answer.status][question.id] + question.vote
            : question.vote
        }
      })
      return results
    },
    {
      pilot: {},
      published: {},
    },
  )
}
