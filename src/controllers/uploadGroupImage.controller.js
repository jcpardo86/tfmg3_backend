// Importación de módulos externos
const multer = require('multer');
const path = require('path');

//Importación de módulos propios
const { uploadGroupImage} = require('../models/upload.model'); 


// Definición de métodos para peticiones sobre subida de imágen de grupo

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images/group')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('imagen');

exports.uploadGroupImage = async (req, res) => {

  const idGrupo = req.body.idGrupo;

  if (!idGrupo || !req.file) {
    return res.status(400).json('Faltan datos requeridos');
  }

  const image = req.file.filename;

	const uploadGroupImg = await uploadGroupImage(image, idGrupo)

	if (uploadGroupImg.error) {
		return res.status(500).json('Error al subir la imagen de grupo');
	}

    res.json('Imagen subida correctamente');

};
