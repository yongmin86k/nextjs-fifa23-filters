import { useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
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
import { StyledBody } from '../components/styled_components/StyledBody'

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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <StyledWarningBox
            expanded={expandedDuplicatePlayers}
            title={`Duplicate players: ${searchFilter.duplicatePlayers.length}`}
            onClick={() => setExpandedDuplicatePlayers(!expandedDuplicatePlayers)}
          >

            {searchFilter.duplicatePlayers.map((player) => (
              <DuplicatePlayerList key={player[0].id} player={player} />
            ))}
          </StyledWarningBox>

          <div style={{ marginLeft: 24 }}>
            Total: {searchFilter.orderedPlayers.length}
          </div>
        </div>

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
