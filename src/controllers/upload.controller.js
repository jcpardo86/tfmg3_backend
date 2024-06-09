const multer = require('multer');
const path = require('path');
const { uploadUserImage, getImageUser } = require('../models/upload.model'); // Asegúrate de que la ruta sea correcta
const { log } = require('console');

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

	console.log("req.body.idUsuario", req.body.idUsuario);
	const userId = req.body.idUsuario;

	console.log("userId", userId);


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

exports.getImage = async (req, res) => {

	log("req.params.id_user", req.params.idUsuario)


  const userId = req.params.id_user;
	console.log("req.params.id_user", req.params.idUsuario);

  if (!userId) {
	return res.status(400).json('Faltan datos requeridos');
  }

  const [image] = await getImageUser(userId);

  if (!image) {
	return res.status(404).json('Imagen no encontrada');
  }

  res.json(image);

};
