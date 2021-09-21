import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Route from '../components/route'
import { useAppState } from '../context/state'

export default function Home({}) {
  const state = useAppState();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {state.routes.map((route) => (
            <li className={utilStyles.listItem} key={route.id}>
              <Route route={route} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
