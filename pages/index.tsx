import { useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout, { siteTitle } from '../components/layout'
import { IPlayer, getAllPlayers } from '../lib/players'
import { CheckBox } from '../components/CheckBox'
import { Button } from '../components/Button'
import { PlayerTable } from '../components/PlayerTable'
import { SearchFilter } from '../lib/searchFilters/SearchFilter'
import { replaceWithQueryBuilder } from '../lib/helpers/queryBuilder'

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

  const router = useRouter()

  const hideLoan = router.query.isLoan === 'false'

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <StyledBody>
        {/* FILTERS */}
        <div style={{ display: 'flex' }}>
          <Button size='small' onClick={() => {
            replaceWithQueryBuilder(router, {
              query: 'isLoan',
              value: hideLoan ? undefined : false,
            })

            searchFilter.toggleLoan(!hideLoan)
          }}>
            <CheckBox checked={!hideLoan} />

            <span style={{ marginLeft: 12 }}>Loan</span>
          </Button>

          <input
            type='number'
            min={0}
            max={99}
            style={{ marginLeft: 12 }}
            onChange={(e) => replaceWithQueryBuilder(router, {
              query: 'min',
              value: e.target.value ? Number(e.target.value) : undefined,
            })}
          />

          <Button size='small' style={{ marginLeft: 12 }} onClick={() => router.reload()}>
            Click to reload
          </Button>
        </div>

        {/* TABLE */}
        <PlayerTable
          searchFilter={searchFilter}
          orderClicked={orderClicked}
          setOrderClicked={setOrderClicked}
        />
      </StyledBody>
    </Layout>
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
