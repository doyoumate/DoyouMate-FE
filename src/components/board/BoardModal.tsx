import { Dispatch, SetStateAction } from 'react'
import { BoardResponse } from '../../module/board/types/response'
import { useQuery } from 'react-query'
import { getBoards } from '../../module/board/api.ts'
import { ModalStates } from '../common/Modal.tsx'
import SelectionModal from '../common/SelectionModal.tsx'

type Props = {
  board?: BoardResponse
  setBoard: Dispatch<SetStateAction<BoardResponse | undefined>> | Dispatch<SetStateAction<BoardResponse>>
} & ModalStates

const BoardModal = ({ isVisible, setIsVisible, board, setBoard }: Props) => {
  const { data: boards = [] } = useQuery(['getBoards'], getBoards)

  return (
    <SelectionModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      name="게시판"
      values={boards}
      selectedValue={board}
      textMapper={value => `${value.name} 게시판`}
      selectHandler={setBoard}
    />
  )
}

export default BoardModal
