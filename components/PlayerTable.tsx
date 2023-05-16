import styled from 'styled-components'
import { IPlayer } from '../lib/players'
import COLOR from '../lib/colors'

interface Props {
  players: IPlayer[]
}

const Table = styled.table`
  margin-top: 16px;
  border: 1px solid ${COLOR.black};
  border-collapse: separate;
  border-spacing: 12px;
  border-radius: 4px;
  background-color: ${COLOR.white};
`

export const PlayerTable = (props: Props) => {
  console.log(props)

  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>

      <tbody>
        {props.players.map(({ id, playerName }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{playerName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
