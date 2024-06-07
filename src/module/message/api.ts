import { GET } from '../../lib/axios/methods.ts'
import { MessageResponse } from './types/response'

const getMyMessages = () => GET<MessageResponse[]>('/message/my')

export { getMyMessages }
