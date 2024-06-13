// Definición de métodos para interactuar con tablas grupo_usuario y grupo de BBDD

const selectGroupsByUser = (id_user) => {
    return db.query(`select * FROM grupo_usuario where idUsuario = ?`, [id_user]);
};

const selectGroupById = (id_group) => {
    return db.query(`select * FROM grupo where idGrupo = ?`, [id_group]);
};

const selectUsersByGroup = (id_group) => {
    return db.query(`select * FROM usuario where idUsuario IN (select idUsuario FROM grupo_usuario where idGrupo = ?)`, [id_group]);
};

const selectStatus = (id_group) => {
    return db.query(`select estado FROM grupo where idGrupo = ?`, [id_group]);
};

const selectImageGroup = (idGrupo) => {
	return db.query('SELECT imagen FROM grupo WHERE idGrupo = ?', [idGrupo]);
};

const insertGroup = ({nombre, descripcion}) => {
    return db.query(`INSERT INTO grupo (nombre, descripcion) VALUES (?, ?)`, [nombre, descripcion]);
};

const insertUserToGroup = ({idGrupo, idUsuario, porcentaje, rol}) => {
    return db.query(`INSERT INTO grupo_usuario (idGrupo, idUsuario, porcentaje, rol) VALUES (?, ?, ?, ?)`, [idGrupo, idUsuario, porcentaje, rol]);
};

const updateStatus = (idGrupo, status) => {
    return db.query(`UPDATE grupo SET estado = ? WHERE idGrupo = ?`, [status, idGrupo]);
};


const deleteGroup = (id_group) => {
    return db.query(`Delete FROM grupo where idGrupo = ?`, [id_group]);
};

const getUserGroup = (id_user, id_group) => {
    return db.query(`select * FROM grupo_usuario where idUsuario = ? AND idGrupo = ?`, [id_user, id_group]);
};

const updateGroup = ({ idGrupo, nombre, descripcion, imagen }) => {
    console.log("LLEGO")
    return db.query(`UPDATE grupo SET nombre = ?, descripcion = ?, imagen = ? WHERE idGrupo = ?`, [nombre, descripcion, imagen, idGrupo]);
};


// Exportación de módulos
module.exports = {
    selectGroupsByUser,
    selectGroupById,
    selectUsersByGroup,
    selectImageGroup,
    insertGroup,
    insertUserToGroup,
    deleteGroup,
    updateStatus,
    selectStatus,
    getUserGroup,
    updateGroup
};