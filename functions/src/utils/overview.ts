export const getAccess = (access: any[]) => {
  const total = { pilot: 0, published: 0 }

  access.forEach((a) => {
    if (a.status === 'pilot') {
      total.pilot = total.pilot + 1
    } else if (a.status === 'published') {
      total.published = total.published + 1
    }
  })

  return { ...total }
}

export const getRespodents = (respondents: any[]) => {
  const total = { pilot: 0, published: 0 }

  respondents.forEach((a) => {
    if (a.status === 'pilot') {
      total.pilot = total.pilot + 1
    } else if (a.status === 'published') {
      total.published = total.published + 1
    }
  })

  return { ...total }
}
