import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout, { siteTitle } from '../components/layout'
import { IPlayer, getAllPlayers } from '../lib/players'

export default function Home({
  allPlayersData,
}: {
  allPlayersData: IPlayer[];
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section style={{ padding: 20 }}>
        {/* <h2>Players : {allPlayersData.length}</h2> */}

        <table border={1}>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
            </tr>
          </thead>

          <tbody>
            {allPlayersData.map(({ id, playerName }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{playerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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
