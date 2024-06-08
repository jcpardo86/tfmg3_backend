

const uploadUserImage = (image, userId) => {

	console.log("datos en uploadUserImage", userId, image);

   return db.query('UPDATE usuario SET imagen = ? WHERE IdUsuario = ?',[image, userId]);

};

const getImageUser = (userId) => {

	return db.query('SELECT imagen FROM usuario WHERE IdUsuario = ?', [userId]);

}

const uploadGroupImage = (image, idGrupo) => {

	console.log("datos en uploadUserImage", idGrupo, image);

   return db.query('UPDATE Grupo SET imagen = ? WHERE idGrupo = ?',[image, idGrupo]);

};

const getGroupImageData = (idGrupo) => {

	return db.query('SELECT imagen FROM Grupo WHERE idGrupo = ?', [idGrupo]);

}


module.exports = {
	uploadUserImage,
	getImageUser,
	uploadGroupImage,
	getGroupImageData

}
