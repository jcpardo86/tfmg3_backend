// Definición de métodos para interactuar con tabla Usuario para subida de imágenes.

const uploadUserImage = (image, userId) => {
   return db.query('UPDATE usuario SET imagen = ? WHERE IdUsuario = ?',[image, userId]);
};

// Me llevo esta consulta al fichero user.model.js
/*const getImageUser = (userId) => {
	return db.query('SELECT imagen FROM usuario WHERE IdUsuario = ?', [userId]);
};*/

const uploadGroupImage = (image, idGrupo) => {
   return db.query('UPDATE Grupo SET imagen = ? WHERE idGrupo = ?',[image, idGrupo]);
};

// Me llevo esta consulta al fichero group.model.js
/*const getGroupImageData = (idGrupo) => {
	return db.query('SELECT imagen FROM Grupo WHERE idGrupo = ?', [idGrupo]);
};*/


module.exports = {
	uploadUserImage,
	//getImageUser,
	uploadGroupImage,
	//getGroupImageData

}
