// Definición de métodos para interactuar con tabla usuario de BBDD

const selectUserById = (id_user) => {
    return db.query(`select * FROM usuario where idUsuario = ?`, [id_user]); 
};

const selectUserByEmail = (email) => {
    return db.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
};

const insertUser = ({nombre, apellidos, email, password, imagen}) => {
    return db.query(`INSERT INTO usuario (nombre, apellidos, email, password, imagen) VALUES (?, ?, ?, ?, ?)`, [nombre, apellidos, email, password, imagen]);
};

const updateById = (id_user, {nombre, apellidos, email, password, imagen}) => {

    return db.query(`UPDATE usuario SET nombre = ?, apellidos = ?, email = ?, password = ?, imagen = ? WHERE idUsuario = ?`, [nombre, apellidos, email, password, imagen, id_user]);

};

// Exportación de módulos
module.exports = {
    selectUserById,
    selectUserByEmail,
    insertUser,
    updateById
};