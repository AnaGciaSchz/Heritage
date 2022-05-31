# Heritage


## Ejecutar el proyecto en local

Independientemente de la forma escogida, es necesario crearse un documento ``.env`` con las siguientes variables:
```
ELASCTIC_PASSWORD=PasswordQueQuieras
ELASTICSEARCH_NODE=http://localhost:9200 (probablemente. Si vas a usar docker, cambia "localhost" por "elastic")
ELASTICSEARCH_USERNAME=UsuarioQueQuierasParaTuElastic
SALT_ROUNDS=UnNumero
SECRET=LoQueQuieras
```
Recuerda ponerlo en la raíz de tu proyecto
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
En la raíz del proyecto, ejecuta
```bash
docker-compose up
```
Y la aplicación estará ejecutandose en tu navegador, en [http://localhost:3000](http://localhost:3000).

## Crear los índices en elastic
Si es la priemra vez que ejecutas la aplicación y tu elastic no tiene índices, ve a la ruta /api/create y se crearán los índices. Hasta que no lo hagas no podrás ver, subir o eliminar cartas.

## Acceder como admin

Por defecto, esta versión en local cuenta con un administrador para que cualquiera pueda jugar con las funcionalidades:

Usuario: Petra
Contraseña: aB12345678*


