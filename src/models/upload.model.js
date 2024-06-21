// Definición de métodos para interactuar con tablas Usuario y Group de BBDD para subida de imágenes.

const uploadUserImage = (image, userId) => {
   return db.query('UPDATE usuario SET imagen = ? WHERE IdUsuario = ?',[image, userId]);
};

const uploadGroupImage = (image, idGrupo) => {
   return db.query('UPDATE grupo SET imagen = ? WHERE idGrupo = ?',[image, idGrupo]);
};

module.exports = {
	uploadUserImage,
	uploadGroupImage,
}
