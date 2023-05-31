import { useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout, { siteTitle } from '../components/layout'
import { IPlayer, getAllPlayers } from '../lib/players'
import { StyledCheckBox } from '../components/styled_components/StyledCheckBox'
import { StyledButton } from '../components/styled_components/StyledButton'
import { PlayerTable } from '../components/PlayerTable'
import { SearchFilter } from '../lib/searchFilters/SearchFilter'
import { replaceWithQueryBuilder } from '../lib/helpers/queryBuilder'
import { StyledNumberInput } from '../components/styled_components/StyledNumberInput'
import { StyledWarningBox } from '../components/styled_components/StyledWarningBox'
import { DuplicatePlayerList } from '../components/DuplicatePlyaerList'

const StyledBody = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4em 6em;
`

const searchFilter = new SearchFilter()

export default function Home({
  allPlayersData,
}: {
  allPlayersData: IPlayer[]
}) {
  searchFilter.setPlayerData(allPlayersData)

  const [orderClicked, setOrderClicked] = useState(false)
  const [expandedDuplicatePlayers, setExpandedDuplicatePlayers] = useState(false)

  const router = useRouter()

  const hideLoan = router.query.isLoan === 'false'

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <StyledBody>
        {/* WARNINGS */}
        <StyledWarningBox
          expanded={expandedDuplicatePlayers}
          title={`Duplicate players: ${searchFilter.duplicatePlayers.length}`}
          style={{ marginBottom: 16 }}
          onClick={() => setExpandedDuplicatePlayers(!expandedDuplicatePlayers)}
        >

          {searchFilter.duplicatePlayers.map((player) => (
            <DuplicatePlayerList key={player[0].id} player={player} />
          ))}
        </StyledWarningBox>

        {/* FILTERS */}
        <div style={{ display: 'flex' }}>
          <StyledButton
            componentSize='small'
            onClick={() => {
              replaceWithQueryBuilder(router, {
                query: 'isLoan',
                value: hideLoan ? undefined : false,
              })

              searchFilter.toggleLoan(!hideLoan)
            }}>
            <StyledCheckBox checked={!hideLoan} />

            <span style={{ marginLeft: 12 }}>Loan</span>
          </StyledButton>

          <StyledNumberInput
            componentSize='small'
            label='Min'
            min={10}
            max={98}
            style={{ marginLeft: 12 }}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined

              replaceWithQueryBuilder(router, {
                query: 'min',
                value,
              })

              searchFilter.setMin(value)
            }}
          />

          <StyledNumberInput
            componentSize='small'
            label='Max'
            min={10}
            max={99}
            style={{ marginLeft: 12 }}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined

              replaceWithQueryBuilder(router, {
                query: 'max',
                value,
              })

              searchFilter.setMax(value)
            }}
          />

          <StyledButton
            componentSize='small'
            style={{ marginLeft: 12 }}
            onClick={() => router.reload()}
          >
            Click to reload
          </StyledButton>
        </div>

        {/* TABLE */}
        <PlayerTable
          searchFilter={searchFilter}
          orderClicked={orderClicked}
          setOrderClicked={setOrderClicked}
        />
      </StyledBody>
    </Layout >
  )
}

export const getStaticProps: GetStaticProps = () => {
  const allPlayersData = getAllPlayers()

  return {
    props: {
      allPlayersData,
    },
  }
}
