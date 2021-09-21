import '../styles/global.css';
import { StateProvider } from '../context/state';

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}
