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

const insertGroup = ({nombre, descripcion}) => {
    return db.query(`INSERT INTO grupo (nombre, descripcion) VALUES (?, ?)`, [nombre, descripcion]);
};

const insertUserToGroup = ({idGrupo, idUsuario, porcentaje, rol}) => {
    return db.query(`INSERT INTO grupo_usuario (idGrupo, idUsuario, porcentaje, rol) VALUES (?, ?, ?, ?)`, [idGrupo, idUsuario, porcentaje, rol]);
};

const updateGroup = ({ idGrupo, nombre, descripcion, imagen }) => {
    return db.query(`UPDATE grupo SET nombre = ?, descripcion = ?, imagen = ? WHERE idGrupo = ?`, [nombre, descripcion, imagen, idGrupo]);
};

const deleteGroup = (id_group) => {
    return db.query(`Delete FROM grupo where idGrupo = ?`, [id_group]);
};

const selectUserGroup = (id_user, id_group) => {
    return db.query(`SELECT * FROM grupo_usuario WHERE idUsuario = ? AND idGrupo = ?`, [id_user, id_group]);
};

const updateGroupUser = ({ idGrupo, idUsuario, porcentaje, rol }) => {
    return db.query(`UPDATE grupo_usuario SET porcentaje = ? WHERE idUsuario = ? AND idGrupo = ?`, [porcentaje, idUsuario, idGrupo]);
};

const deleteGroupUsers = (id_group) => {
    return db.query(`DELETE FROM grupo_usuario WHERE idGrupo = ?`, [id_group]);
};

// Exportación de módulos
module.exports = {
    selectGroupsByUser,
    selectGroupById,
    selectUsersByGroup,
    insertGroup,
    insertUserToGroup,
    deleteGroup,
    selectUserGroup,
    updateGroup,
    updateGroupUser,
    deleteGroupUsers
};