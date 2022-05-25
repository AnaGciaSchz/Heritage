import nextConnect from 'next-connect';
import multer from 'multer';

const logger = require('pino')()

const upload = multer({
    storage: multer.diskStorage({
      destination: './public/temporalImages',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  });

const uploadMiddleware = upload.single('image');

const apiRoute = nextConnect({

  onNoMatch(req, res) {
    logger.error("No se ha podido almacenar una imagen temporalmente.")
    logger.error(`Method '${req.method}' Not Allowed`)
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  logger.info("Se ha almacenado una imagen temporalmente.")
  res.status(200).json({ result: "ok", message: "Image uploaded to temp"});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};