import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getRoutesResult } from '../lib/main'
import Route from '../components/route'

export default function Home({ routes }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {routes.map((route) => (
            <li className={utilStyles.listItem} key={route.id}>
              <Route route={route} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const result = await getRoutesResult()
  return {
    props: {
      routes: result.routes,
    }
  }
}
