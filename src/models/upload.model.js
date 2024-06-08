

const uploadUserImage = (image, userId) => {

	console.log("datos en uploadUserImage", userId, image);

   return db.query('UPDATE usuario SET imagen = ? WHERE IdUsuario = ?',[image, userId]);

};



module.exports = {
	uploadUserImage

}
