import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Route from '../components/route'
import { useAppState, loadRoutes } from '../context/state'
import { Switch, Spin } from 'antd';

export default function Home({ }) {
  const state = useAppState();

  const toggleReverse = () => {
    state.isLoading(true)
    loadRoutes(!state.reverse)
      .then((res) => {
        state.setRoutes(res.data.routes)
        state.toggleReverse()
        state.isLoading(false)
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
        {state.loading 
          ? <div className={utilStyles.spinner}><Spin size="large" /></div>
          : <ul className={utilStyles.list}>
              {state.routes.map((route) => (
                <li className={utilStyles.listItem} key={route.id}>
                  <Route route={route} />
                </li>
              ))}
            </ul>}
      </section>
    </Layout>
  )
}
