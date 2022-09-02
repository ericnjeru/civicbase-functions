import { Request } from '../types/function'

// params are coming like this: { '0': '/LAf1qornQ4c7pzS6BwrV' }
export const params = (req: Request) => {
  return req.params['0'].replace('/', '')
}
