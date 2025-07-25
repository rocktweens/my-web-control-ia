import Cart from "@/components/cart/Cart";
import OpenCart from "@/components/cart/OpenCart";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import { ChatProvider } from "@/context/ChatContext";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
// import ChatFloatingWindow from "@/components/ChatFloatingWindow"; // nuevo componente de chat

import "@/styles/main.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="commerceplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <ChatProvider>
          <Providers>
            <Header>
              <OpenCart />
              <Cart />
            </Header>
            <main>{children}</main>
            <Footer />
            {/* Componente de chat, flotante y condicional */}
            {/* <ChatFloatingWindow /> */}
            <WhatsappFloatingButton />
          </Providers>
        </ChatProvider>
      </body>
    </html>
  );
}
