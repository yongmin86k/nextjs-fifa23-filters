import styled from 'styled-components'
import { IPlayer } from '../../lib/players'
import COLOR from '../../lib/colors'

interface Props {
  data: {
    league: {
      id: string
      name: string
      abbr5: string
      abbr15: string
    }
    players: IPlayer[]
  }
}

const Card = styled.div`
  border: 1px solid ${COLOR.border};
  border-radius: 4px;
  padding: 12px 16px;
  margin-right: 24px;
  margin-bottom: 24px;

  p {
    min-width: 180px;
    margin: 0;

    &:nth-child(1) {
      font-weight: bold;
      font-size: 12px;
      color: ${COLOR.gray700};
      margin-bottom: 4px;
    }

    &:nth-child(2) {
      margin-bottom: 4px;
    }

    &:nth-child(3) {
      font-size: 36px;
      text-align: right;
      color: ${COLOR.gray400};
    }
  }
`

export const StyledLeagueCard = ({ data: { league, players } }: Props) => (
  <Card>
    <p>{league.abbr5}</p>

    <p>{league.name}</p>

    <p>{players.length}</p>
  </Card>
)
