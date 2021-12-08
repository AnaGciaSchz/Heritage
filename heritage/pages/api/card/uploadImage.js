import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
      destination: './public/cardImages',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  });

const uploadMiddleware = upload.single('image');

const apiRoute = nextConnect({

  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req, res) => {
  res.status(200).json({ result: "ok", message: "Image uploaded to server"});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};