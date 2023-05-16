import { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import COLOR from '../lib/colors'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html { 
						font-family: ${roboto.style.fontFamily};
						color: ${COLOR.black};
					}
          body { 
						margin: 0;
						background-color: ${COLOR.background};
					}
        `}
      </style>

      <Component {...pageProps} />
    </>
  )
}
