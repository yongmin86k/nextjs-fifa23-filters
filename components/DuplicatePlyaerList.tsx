import styled from 'styled-components'
import { IPlayer } from '../lib/players'
import COLOR from '../lib/colors'

interface Props {
  player: IPlayer[]
}

const StyledList = styled.div`
  display: flex;
  margin-bottom: 4px;
  color: ${COLOR.gray600};

  &:last-child {
    margin-bottom: 0px;
  }

  div {
    &:first-child { min-width: 150px; }
    &:nth-child(2) { margin-right: 12px; }
  }
`

export const DuplicatePlayerList = (props: Props) => {
  const { player } = props

  const ratings = player
    .map((p) => p.rating)
    .sort((a, b) => a - b)
    .join(', ')

  return (
    <StyledList>
      <div>
        {player[0].playerName}
      </div>
      <div>
        ({player.length})
      </div>
      <div>
        Ratings: {ratings}
      </div >
    </StyledList>
  )
}
