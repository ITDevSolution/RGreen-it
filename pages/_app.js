import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Header from "components/Header"

import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <div className="h-screen overflow-y-scroll bg-slate-200 ">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
