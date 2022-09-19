import '../styles/globals.css'
import App from '../components/AppLayout/index';
import AppLayout from '../components/AppLayout/index';

function MyApp({ Component, pageProps }) {
  return( 
    <AppLayout>
       <Component {...pageProps} />
    </AppLayout>
    )
}

export default MyApp
