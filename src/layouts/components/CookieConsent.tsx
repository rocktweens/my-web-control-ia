"use client";

import { useEffect, useState } from "react";

const GTM_ID = "GTM-5CT4JRJR";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (consent === "accepted") {
      injectGTM();
    }

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const injectGTM = () => {
    if (document.getElementById("gtm-script")) return;

    // GTM <script> for <head>
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);

    // GTM <noscript> for <body>
    const noscript = document.createElement("noscript");
    noscript.id = "gtm-noscript";
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
  };

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("cookieConsent", accepted ? "accepted" : "rejected");
    setVisible(false);
    if (accepted) {
      injectGTM();
    }
  };

  if (!visible) return null;

return (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl bg-[#006d71] text-white text-sm shadow-lg border border-[#00585c] px-6 py-4 rounded-lg">
    <div className="flex flex-col gap-3">
      <p>
        Utilizamos cookies propias y de terceros para mejorar la experiencia del usuario. Podés aceptarlas, rechazarlas o configurarlas desde el aviso de cookies que aparece al ingresar.{" "}
        <a href="/privacy-policy" className="underline text-white hover:text-gray-200">
          Leer más
        </a>
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => handleConsent(true)}
          className="bg-white text-[#006d71] px-4 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          Aceptar
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#006d71] transition-colors"
        >
          Rechazar
        </button>
      </div>
    </div>
  </div>
);



};

export default CookieConsent;
