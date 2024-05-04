import { GET } from '../../lib/axios.ts'
import { BoardResponse } from './dto/response'

const getBoards = () => GET<BoardResponse[]>(`/board`)

export { getBoards }
