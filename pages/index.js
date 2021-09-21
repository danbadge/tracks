import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Route from '../components/route'
import { useAppState, loadRoutes } from '../context/state'
import { Switch } from 'antd';

export default function Home({ }) {
  const state = useAppState();

  const toggleReverse = () => {
    loadRoutes(!state.reverse)
      .then((res) => {
        state.setRoutes(res.data.routes)
        state.toggleReverse()
      })
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.toggle}>
        <label>Reverse <Switch defaultChecked={state.reverse} onChange={toggleReverse} /></label>
      </div>
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
