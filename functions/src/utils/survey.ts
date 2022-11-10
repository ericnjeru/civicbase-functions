export enum MethodIds {
  Quadratic = 'Q',
  Likert = 'L',
  Conjoint = 'C',
}

export function setQuestionsId(survey: any) {
  switch (survey.setup.method) {
    case 'Quadratic':
      return survey.quadratic?.map((question: any, index: any) => ({
        ...question,
        id: `${MethodIds.Quadratic}${index + 1}`,
      }))
    case 'Conjoint':
      return survey.conjoint?.map((question: any, index: any) => ({
        ...question,
        items: question.items.map((item: any, itemIndex: any) => ({
          ...item,
          id: `${MethodIds.Conjoint}${index + 1}-item${itemIndex + 1}`,
        })),
        id: `${MethodIds.Conjoint}${index + 1}`,
      }))
    case 'Likert':
      return survey.likert?.map((question: any, index: any) => ({
        ...question,
        id: `${MethodIds.Likert}${index + 1}`,
      }))
  }
}
