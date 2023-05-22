import { Dispatch, SetStateAction } from 'react'
import { IPlayer } from '../lib/players'
import { SearchFilter } from '../lib/searchFilters/SearchFilter'
import { StyledTable } from './styled_components/StyledTable'

interface Props {
  searchFilter: SearchFilter
  orderClicked: boolean
  setOrderClicked: Dispatch<SetStateAction<boolean>>
}

const tableHeaders: ({ key: keyof IPlayer, text: string })[] = [
  { key: 'playerName', text: 'Name' },
  { key: 'rating', text: 'Rating' },
  { key: 'loans', text: '# of Loan' },
  { key: 'rarityName', text: 'Rarity' },
  { key: 'team', text: 'Team' },
  { key: 'league', text: 'League' },
  { key: 'nationality', text: 'Nationality' },

]

export const PlayerTable = (props: Props) => {
  const { searchFilter } = props
  const { toggleOrderBy } = searchFilter

  const handleOnClick = (key: keyof IPlayer) => {
    toggleOrderBy(key)

    props.setOrderClicked(!props.orderClicked)
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          {/* TODO: Show arrows by order */}
          {tableHeaders.map((header) => (
            <th key={header.key} onClick={() => handleOnClick(header.key)}>{header.text} {searchFilter.showOrderIcon(header.key)}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {searchFilter.orderedPlayers.map(({
          id, playerName, rating, loans, rarityName, league, team, nationality,
        }, index) => (
          <tr key={`${id}-${index}`}>
            <td>{playerName}</td>
            <td>{rating}</td>
            <td>{loans}</td>
            <td>{rarityName}</td>
            <td>{team.abbr3 || team.abbr10 || team.abbr15 || team.club}</td>
            <td>{league.abbr5 || league.abbr15 || league.name}</td>
            <td>{nationality.abbr || nationality.abbr12 || nationality.name}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
