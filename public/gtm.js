
const loadGTM = () => {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-NCRFPBBJHF';
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NCRFPBBJHF');
};

// Delay GTM loading by 4 seconds
setTimeout(loadGTM, 4000);
