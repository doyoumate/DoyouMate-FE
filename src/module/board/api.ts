import { GET } from '../../lib/axios/methods.ts'
import { BoardResponse } from './types/response'

const getBoards = () => GET<BoardResponse[]>(`/board`)

export { getBoards }
