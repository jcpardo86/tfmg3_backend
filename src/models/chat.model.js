// Definición de métodos para interactuar con tabla mensaje de BBDD

const insertMessage = (text, username, grupo) => {
    return db.query(`INSERT INTO mensaje (idUsuario, texto, idGrupo) VALUES (?, ?, ?)`, [username, text, grupo]);;
};

const selectMessages = (id_grupo) => {
    return db.query(`SELECT texto, idUsuario FROM mensaje WHERE idGrupo = ?`, [id_grupo]);

};

// Exportación de módulos
module.exports = {
    insertMessage,
    selectMessages
}