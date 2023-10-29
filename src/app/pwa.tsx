const PWA = () => {
  return (
    <head>
      <link rel="manifest" href="/manifest.json" />
      <link
        href="src/app/favicon.ico"
        rel="icon"
        type="image/icon"
        sizes="16x16"
      />
      <link rel="apple-touch-icon" href="public/icons/icon-192x192.png"></link>
      <meta name="msapplication-TileColor" content="#FF98BA"></meta>
      <meta name="theme-color" content="#FF98BA"></meta>
    </head>
  );
};

export default PWA;
