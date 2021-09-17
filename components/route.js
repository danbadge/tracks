import Time from '../components/time'
import utilStyles from '../styles/utils.module.css'

export default function Route({ route }) {
  return (
    <section className={utilStyles.routeContainer}>
      <div className={utilStyles.routeLeftCol}>
        <div><Time dateString={route.departureTime} /> &#8594; <Time dateString={route.arrivalTime} /></div>
        <div>{route.from} &#8594; {route.to}</div>
        <div className={utilStyles.small}>{route.changes == 0 ? "Direct" : `${route.changes} changes`}</div>
      </div>
      <div className={utilStyles.routeRightCol}>
        <div className={utilStyles.small}>{route.duration} mins</div>
      </div>
    </section>
  )
}
