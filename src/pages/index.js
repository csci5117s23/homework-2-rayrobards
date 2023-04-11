import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/TodoApp.module.css'
import Link from 'next/link'
import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import {
  // ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
  useSession,
} from "@clerk/clerk-react";

// const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function Home() {
  let router = useRouter()

  const [login, setLogin] = useState(false)

  function signIn()
  {
    console.log("click")
    setLogin(true)
  }

  function Redirect() {
    const { user } = useUser();
    // console.log(user);
    // addUsertoDB()
    router.push('/todos')
  }

  const publishableKey= process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <>
      <Head>
          <title>home page</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
        <SignedIn>
          <Redirect />
        </SignedIn>
        <SignedOut>
          <h1>Rays todo app</h1>
          <button onClick={signIn}>Login or Signup</button>
          {login && (
            <RedirectToSignIn />
          )}
        </SignedOut>
    </>
  )
}
