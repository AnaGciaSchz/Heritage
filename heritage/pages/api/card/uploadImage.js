import nextConnect from 'next-connect';
import multer from 'multer';

const logger = require('pino')()

const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
]

const upload = multer({
    storage: multer.diskStorage({
      destination: './public/cardImages',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
    fileFilter: (req, file, cb) => {
      if (!whitelist.includes(file.mimetype)) {
        logger.error("Error: La imagen elegida para la card no tiene formato correcto: png, jpeg, jpg o webp.")
        return cb(new Error('file is not allowed'))
      }
      cb(null, true)
    }
  });

const uploadMiddleware = upload.single('image');

const apiRoute = nextConnect({

  onNoMatch(req, res) {
    logger.error("No se ha podido almacenar una imagen.")
    logger.error(`Method '${req.method}' Not Allowed`)
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  logger.info("Se ha almacenado una imagen para una carta.")
  res.status(200).json({ result: "ok", message: "Image uploaded to server"});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, 
  },
};