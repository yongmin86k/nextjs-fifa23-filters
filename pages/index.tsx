import Head from 'next/head'
import { isNumber } from 'lodash'
import Layout, { siteTitle } from '../components/layout'
import { GetStaticProps } from 'next'
import { IPlayer, getAllPlayers } from '../lib/players'

export default function Home({
  allPlayersData
}: {
  allPlayersData: IPlayer[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <h2>Players : {allPlayersData.length}</h2>

        <table border={1}>
          <tr>
            <th>No.</th>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Rating</th>
            <th>Is loan</th>
            <th>rarityName</th>
          </tr>

          {
            allPlayersData.map(({ id, playerName, rating, loans, rarityName }, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>{id}</td> */}
                  <td>{playerName}</td>
                  <td>{rating}</td>
                  <td>{isNumber(loans) ? loans : '-'}</td>
                  <td>{rarityName || '- -'}</td>
                </tr>
              )
            })
          }
        </table>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPlayersData = getAllPlayers()

  return {
    props: {
      allPlayersData,
    }
  }
}