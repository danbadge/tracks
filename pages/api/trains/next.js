import axios from 'axios'
import { utcToZonedTime } from 'date-fns-tz'
import { v4 as uuidv4 } from 'uuid';

const makeTflRequest = async (routes) => {
    const appId = process.env.TFL_APP_ID;
    const appKey = process.env.TFL_APP_KEY;
    // TFL API always returns dates in UK timezone
    const now = utcToZonedTime(Date.now(), 'Europe/London')

    return Promise.all(routes.map(async (route) => {
        const tflUrl = 'https://api.tfl.gov.uk';
        const reqUrl = `${tflUrl}/journey/journeyresults/${route.from.stopId}/to/${route.to.stopId}?app_id=${appId}&app_key=${appKey}`
        const response = await axios.get(reqUrl)
        
        const routeTimetable = response.data.journeys.filter(tflRoute => {
            return Date.parse(tflRoute.startDateTime) >= now
        })
        return routeTimetable.map(tflRoute => {
            return {
                id: uuidv4(),
                departureTime: tflRoute.startDateTime,
                from: route.from.name,
                arrivalTime: tflRoute.arrivalDateTime,
                to: route.to.name,
                changes: tflRoute.legs.length - 1,
                duration: tflRoute.duration,
                leavingInUpper: Math.ceil((Date.parse(tflRoute.startDateTime) - now) / 60000)
            }
        })
    }))
}

export default async (req, res) => {
    const routes = [
        {
            from: {
                stopId: '910GKENTHOS',
                name: 'Kent House'
            },
            to: {
                stopId: '1000248',
                name: 'London Victoria'
            }
        },
        {
            from: {
                stopId: '910GBIRKBCK',
                name: 'Birkbeck'
            },
            to: {
                stopId: '910GLNDNBDC',
                name: 'London Bridge'
            }
        },
        {
            from: {
                stopId: '910GNORWDJ',
                name: 'Norwood Junction'
            },
            to: {
                stopId: '910GLNDNBDC',
                name: 'London Bridge'
            }
        },
        {
            from: {
                stopId: '910GELMERSE',
                name: 'Elmers End'
            },
            to: {
                stopId: '910GLNDNBDC',
                name: 'London Bridge'
            }
        },
        {
            from: {
                stopId: '910GANERLEY',
                name: 'Anerley'
            },
            to: {
                stopId: '910GCNDAW',
                name: 'Canada Water'
            }
        },
        {
            from: {
                stopId: '910GCRYSTLP',
                name: 'Crystal Palace'
            },
            to: {
                stopId: '910GCNDAW',
                name: 'Canada Water'
            }
        }
    ]

    const allRoutesTimetable = await makeTflRequest(routes)
    
    const sortedRoutes = allRoutesTimetable.flat()
        .sort((a,b) => Date.parse(a.arrivalTime) - Date.parse(b.arrivalTime))
    
    res.status(200).json({ 
        routes: sortedRoutes,
    })
  }
  