import Time from '../components/time'
import utilStyles from '../styles/utils.module.css'

export default function Route({ route }) {
  return (
    <section className={utilStyles.routeContainer}>
      <div className={utilStyles.routeLeftCol}>
        <div><Time dateString={route.departureTime} /> &#8594; <Time dateString={route.arrivalTime} /> <span className={utilStyles.grey}>({route.duration} mins)</span></div>
        <div>{route.from} &#8594; {route.to}</div>
        <div className={utilStyles.small}>{route.changes == 0 ? "Direct" : `${route.changes} changes`}</div>
      </div>
      <div className={utilStyles.routeRightCol}>
        <div className={utilStyles.small}>&#60; {route.leavingInUpper + (route.leavingInUpper == 1 ? " min" : " mins") }</div>
      </div>
    </section>
  )
}
