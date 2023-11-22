import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ThemeProvider } from "styled-components";
import { DefaultGlobalStyles } from "presentation/styles/global/defaultGlobalStyles";
import { defaultTheme } from "presentation/styles/theme/defaultTheme";
import { printLog } from "presentation/logs/logs";
import AuthProvider from "application/context/Auth/AuthContext";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/nprogress.css";

export function reportWebVitals(metric: any) {
  printLog(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Script
        src="https://kit.fontawesome.com/b96c8160f9.js"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script id="live-chat-script" strategy="afterInteractive">
        {` window.__lc = window.__lc || {};
       window.__lc.license = 14844111;
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`}
      </Script>
      <noscript>
        <a href="https://www.livechat.com/chat-with/14844111/" rel="nofollow">
          Chat with us
        </a>
        , powered by
        <a
          href="https://www.livechat.com/?welcome"
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>
      <DefaultGlobalStyles />
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
