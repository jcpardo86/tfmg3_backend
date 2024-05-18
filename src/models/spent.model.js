// Definición de métodos para interactuar con tabla gasto de BBDD

const selectSpentsByGroup = (id_group) => {
    return db.query(`select * FROM gasto where idGrupo = ?`, [id_group]) //Cada vez q tenga una variable pongo un ? y luego en el array indico en orden el valor de cada variable
};

const selectTotalSpentByUser = (id_user, id_group) => {
    return db.query(`select SUM(importe) AS total_importe FROM gasto where idUsuario = ? and idGrupo = ?`, [id_user, id_group]);
};

const selectSpentById = (id_spent) => {
    return db.query(`select * FROM gasto where idGasto = ?`, [id_spent]) 
};

const selectTotalSpentByGroup = (id_group) => {
    return db.query(`select SUM(importe) AS total_importe FROM gasto where idGrupo = ?`, [id_group]);
};

const insertSpent = ({idUsuario, idGrupo, descripcion, importe, fecha}) => {
    return db.query(`INSERT INTO gasto (idUsuario, idGrupo, descripcion, importe, fecha) VALUES (?, ?, ?, ?, ?)`, [idUsuario, idGrupo, descripcion, importe, fecha]);

};


// Exportación de módulos
module.exports = {
    selectSpentsByGroup,
    selectTotalSpentByUser,
    selectSpentById,
    selectTotalSpentByGroup,
    insertSpent
};