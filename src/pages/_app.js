import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs';


const publishableKey= process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;


function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider publishableKey={publishableKey} {...pageProps} >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
