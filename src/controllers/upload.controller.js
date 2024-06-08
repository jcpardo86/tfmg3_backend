const multer = require('multer');
const path = require('path');
const { uploadUserImage } = require('../models/upload.model'); // Asegúrate de que la ruta sea correcta

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images/user')); // Asegúrate de que la ruta sea correcta
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('imagen');

exports.uploadImage = async (req, res) => {
  const userId = req.body.IdUsuario;

  if (!userId || !req.file) {
    return res.status(400).json('Faltan datos requeridos');
  }

  const image = path.join('/images/user', req.file.filename);

	const uploadUserImg = await uploadUserImage(image, userId)

	if (uploadUserImg.error) {
		return res.status(500).json('Error al subir la imagen');
	}

    res.json('Imagen subida correctamente');
};
