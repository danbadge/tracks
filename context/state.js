import axios from 'axios';
import { 
    createContext, 
    useContext, 
    useState,
    useEffect
} from 'react';

const AppContext = createContext();

export function StateProvider({ children }) {
  let [initialState, setState] = useState({
      routes: [],
      reverse: false
  });

  useEffect(async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/trains/next`)
        setState({ routes: res.data.routes })
      } catch (error) {
        console.log(error)
      }
  }, [])

  return (
    <AppContext.Provider value={initialState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}