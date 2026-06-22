if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('Service Worker geregistreerd');
    })
    .catch(function(fout) {
      console.error('Registratie mislukt:', fout);
    });
}