// Exportación de módulos externos
const multer = require('multer');
const path = require('path');

// Exportación de módulos propios
const { uploadUserImage} = require('../models/upload.model'); 


// Definición de métodos para peticiones sobre subida de imágen de usuario

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images/user')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('imagen');

exports.uploadUserImage = async (req, res, next) => {
  
	const userId = req.body.idUsuario;
  if (!userId || !req.file) {
    return res.status(400).json('Faltan datos requeridos');
  }

  const image = req.file.filename;
  try {
	  const uploadUserImg = await uploadUserImage(image, userId)
	  if (uploadUserImg.error) {
		  return res.status(500).json('Error al subir la imagen');
	  }

    res.json('Imagen subida correctamente');

  } catch (error) {
    next(error);
  }
};

