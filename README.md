# Heritage


## Ejecutar el proyecto en local

### Sin Docker

Primero, instala las dependencias:
```bash
npm install
```

Y después, ejecuta el proyecto:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

### Con Docker
Ve a la raíz del proyecto y ejecuta:
```bash
docker build . -t heritage
```
A continuación, crea el contenedor:
```bash
docker run -p 3000:3000 heritage
```
Y la aplicación estará ejecutandose en tu navegador, en [http://localhost:3000](http://localhost:3000).
