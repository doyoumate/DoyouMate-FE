import { ProfessorResponse } from './types.d.ts/response'
import { GET } from '../../lib/axios/methods.ts'

const getProfessorById = (id: string) => GET<ProfessorResponse>(`/professor/${id}`)

export { getProfessorById }
