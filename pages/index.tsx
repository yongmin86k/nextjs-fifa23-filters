import Head from 'next/head'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import Layout, { siteTitle } from '../components/layout'
import { IPlayer, getAllPlayers } from '../lib/players'
import { CheckBox } from '../components/CheckBox'
import { Button } from '../components/Button'
import { PlayerTable } from '../components/PlayerTable'

const StyledBody = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4em 6em;
`

export default function Home({
  allPlayersData,
}: {
  allPlayersData: IPlayer[]
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <StyledBody>
        {/* FILTERS */}
        <Button size='small'>
          <CheckBox />

          <span style={{ marginLeft: 12 }}>Loan</span>
        </Button>

        {/* TABLE */}
        <PlayerTable players={allPlayersData}/>
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
