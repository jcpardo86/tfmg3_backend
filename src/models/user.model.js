// Definición de métodos para interactuar con tabla usuario de BBDD

const selectUserById = (id_user) => {
    return db.query(`select * FROM usuario where idUsuario = ?`, [id_user]); 
};

const selectUserByEmail = (email) => {
    return db.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
};

//LARA - Añado esta consulta para obtener el nombre del archivo de imagen del usuario
const selectImageUser = (id_user) => {
	return db.query('SELECT imagen FROM usuario WHERE IdUsuario = ?', [id_user]);
};

const insertUser = ( {nombre, apellidos, email, password} ) => {
    return db.query(`INSERT INTO usuario (nombre, apellidos, email, password) VALUES (?, ?, ?, ?)`, [nombre, apellidos, email, password]);
};

const updateById = (id_user, {nombre, apellidos, email, password}) => {

    return db.query(`UPDATE usuario SET nombre = ?, apellidos = ?, email = ?, password = ? WHERE idUsuario = ?`, [nombre, apellidos, email, password, id_user]);

};

// Exportación de módulos
module.exports = {
    selectUserById,
    selectUserByEmail,
    selectImageUser,
    insertUser,
    updateById
};