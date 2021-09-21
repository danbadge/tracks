import axios from 'axios';
import {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

const AppContext = createContext();

export async function loadRoutes(reverse) {
    return await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/trains/next?reverse=${reverse}`)
}

export function StateProvider({ children }) {
    const initialState = {
        routes: [],
        reverse: false,
        setRoutes: (routes) => {
            setState(previousState => ({...previousState, routes: routes}))
        },
        toggleReverse: () => {
            setState(previousState => ({...previousState, reverse: !previousState.reverse}))
        }
    };

    let [state, setState] = useState(initialState);

    useEffect(async () => {
        try {
            const res = await loadRoutes(false)
            state.setRoutes(res.data.routes)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppState() {
    return useContext(AppContext);
}