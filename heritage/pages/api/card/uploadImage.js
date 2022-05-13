import nextConnect from 'next-connect';
import multer from 'multer';

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
        return cb(new Error('file is not allowed'))
      }
      cb(null, true)
    }
  });

const uploadMiddleware = upload.single('image');

const apiRoute = nextConnect({

  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  res.status(200).json({ result: "ok", message: "Image uploaded to server"});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, 
  },
};