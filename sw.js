const nombreCache = 'dhara-cache'; //nombre del cache
const archivos = ['/', //archivos a cachear
                'index.html',
                'css/styles.css',
                'js/CarritoClass.js',
                'js/ProductoClass.js',
                'js/index.js'

];



self.addEventListener('install', precatching =>{ //instalacion del sw
    self.skipWaiting(); //esto elimina el sw existente y activa el nuevo
    precatching.waitUntil(  //espera a que se cargue el cache
        caches 
            .open(nombreCache) //abre el cache
            .then(cache => { 
              console.log() 
              cache.addAll(archivos); //agrega los archivos al cache
            })
    )
})

self.addEventListener('fetch', cargarCache =>{ //carga del cache
  cargarCache.respondWith( 
      caches
          .match(cargarCache.request) //busca en el cache
          .then(respuesta => {
              if (respuesta){
                  return respuesta;
              }


              let peticionCache = cargarCache.request.clone(); //clonamos la peticion

              return fetch(peticionCache) //hacemos la peticion
                  .then(respuesta => { 
                      if (!respuesta){ //si no hay respuesta
                          return respuesta; 
                      }
                      let respuestaCache = respuesta.clone(); //clonamos la respuesta
                      caches
                          .open(nombreCache)
                          .then (cache => {
                              cache.put(peticionCache, respuestaCache);
                          })
                          return respuesta;
                  })
          })
  );
})