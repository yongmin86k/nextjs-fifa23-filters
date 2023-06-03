import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout, { siteTitle } from '../../components/layout'
import { SearchFilter } from '../../lib/searchFilters/SearchFilter'
import { IPlayer, getAllPlayers } from '../../lib/players'
import { StyledBody } from '../../components/styled_components/StyledBody'
import { StyledLeagueCard } from '../../components/styled_components/StyledLeagueCard'

const searchFilter = new SearchFilter()

export default function Leagues({
  allPlayersData,
}: {
  allPlayersData: IPlayer[]
}) {
  searchFilter.setPlayerData(allPlayersData)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}: Leagues</title>
      </Head>

      <StyledBody>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* TODO: make it as a table */}
          {Object.values(searchFilter.orderedGroupByLeague).map((data) => (
            <StyledLeagueCard
              key={data.league.id}
              data={data}
            />
          ))}
        </div>
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
