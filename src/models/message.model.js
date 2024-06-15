// Definición de métodos para interactuar con tabla mensaje de BBDD

const selectMessages = (id_grupo) => {
    return db.query(`SELECT idMensaje, idUsuario, fecha_hora, texto FROM mensaje WHERE idGrupo = ?`, [id_grupo]);
};

const insertMessage = (idUsuario, idGrupo, fecha_hora, texto) => {
    return db.query(`INSERT INTO mensaje (idUsuario, idGrupo, fecha_hora, texto) VALUES (?, ?, ?, ?)`, [idUsuario, idGrupo, fecha_hora, texto]);;
};


// Exportación de módulos
module.exports = {
    selectMessages,
    insertMessage    
};