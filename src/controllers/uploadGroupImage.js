const multer = require('multer');
const path = require('path');
const { uploadGroupImage, getGroupImageData } = require('../models/upload.model'); // Asegúrate de que la ruta sea correcta

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images/group')); // Asegúrate de que la ruta sea correcta
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('imagen');

exports.uploadImage = async (req, res) => {
  const idGrupo = req.body.idGrupo;

  if (!idGrupo || !req.file) {
    return res.status(400).json('Faltan datos requeridos');
  }

  const image = path.join('/images', req.file.filename);

	const uploadGroupImg = await uploadGroupImage(image, idGrupo)

	if (uploadGroupImg.error) {
		return res.status(500).json('Error al subir la imagen de grupo');
	}

    res.json('Imagen subida correctamente');

};

exports.getGroupImage = async (req, res) => {

	console.log("req.params.id_group", req.params.id_group);
	const groupId = req.params.id_group;
	console.log("groupId", groupId);

	console.log(groupId);

  if (!groupId) {
	return res.status(400).json('Faltan datos requeridos');
  }

  const [image] = await getGroupImageData(groupId);

  if (!image) {
	return res.status(404).json('Imagen no encontrada');
  }

  res.json(image);

};
