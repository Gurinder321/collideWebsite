import React,{useState,useEffect} from 'react';
import { Poppins,STIX_Two_Text,Montserrat,Puppies_Play,DM_Serif_Text ,Sriracha, Metal } from 'next/font/google'
import "../styles/globals.css";
import localFont from 'next/font/local'
import { ModalProvider } from '../context/modalContext';
import Router from 'next/router';
import Modal from "@/components/modal";
import ScrollToHash from '@/components/SrollToHash';
const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins'
})
const stix_two_text = STIX_Two_Text({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-stix'
})

const metal = Metal({
  weight: '400',   
  style: 'normal',   
  subsets: ['latin'],
  variable: '--font-metal'
});
const sriracha = Sriracha({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  subsets: ['latin'],
  variable: '--font-kalam'
})
const puppies = Puppies_Play({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-puppies'
})
const dmserif = DM_Serif_Text({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-puppies'
})
const montserrat = Montserrat({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-montserrat'
})
const joaneitalic = localFont({ 
  src: './fonts/JoaneItalic-ExtraLight.woff',
  style:'italic',
  weight: '400',
  variable: '--font-joaneitalic'
})
const allinpiska = localFont({ 
  src: './fonts/Allin-Priska.ttf',
  style:'italic',
  weight: '400',
  variable: '--font-joaneitalic'
})
const amerigo = localFont({ 
  src: './fonts/Amerigo-BT.ttf',
  style:'normal',
  weight: '400',
  variable: '--font-amerigo'
})
const winslowtitle = localFont({ 
  src: '/fonts/winslow-title-bold-italic.ttf',
  style:'italic',
  weight: '400',
  variable: '--font-winslowtitle'
})
const adobejenson = localFont({ 
  src: '/fonts/Adobe-Jenson-Pro-Semibold.otf',
  style:'italic',
  weight: '400',
  variable: '--font-adobejenson'
})
const kievitSerifBold = localFont({ 
  src: '/fonts/KievitSerif-Bold.ttf',
  style:'italic',
  weight: '400',
  variable: '--font-kievitSerifBold'
})
const kievitSerif = localFont({ 
  src: '/fonts/KievitSerif.ttf',
  style: 'normal',
  weight: '400',
  variable: '--font-kievitSerif'
})

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    const loadAssets = async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          });
        })
      );
      setLoading(false);
    };

    loadAssets();

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-8 border-t-[#d394e2] border-gray-300"></div>
      </div>
    );
  }
  return (
    <>
    <style jsx global>{`
      :root {
        --font-poppins: ${poppins.style.fontFamily};
        --font-stix: ${stix_two_text.style.fontFamily};
        --font-metal: ${metal.style.fontFamily};
        --font-sriracha: ${sriracha.style.fontFamily};
        --font-puppies: ${puppies.style.fontFamily};
        --font-joaneitalic: ${joaneitalic.style.fontFamily};
        --font-allinpiska: ${allinpiska.style.fontFamily};
        --font-amerigo:${amerigo.style.fontFamily};
        --font-dmserif:${dmserif.style.fontFamily};
        --font-winslowtitle:${winslowtitle.style.fontFamily};
        --font-montserrat:${montserrat.style.fontFamily};
        --font-adobejenson:${adobejenson.style.fontFamily};
        --font-kievitSerif:${kievitSerif.style.fontFamily};
        --font-kievitSerifBold:${kievitSerifBold.style.fontFamily}
      }`}
    </style>
    <ScrollToHash />
    <ModalProvider>
     <Component {...pageProps} />
     <Modal />
    </ModalProvider>
   
  </>
  )
}
