// Definición de métodos para interactuar con tabla gasto de BBDD

const selectSpentsByGroup = (id_group) => {
    return db.query(`select * FROM gasto where idGrupo = ?`, [id_group]) //Cada vez q tenga una variable pongo un ? y luego en el array indico en orden el valor de cada variable
};

const selectTotalSpentByUser = (id_user, id_group) => {
    return db.query(`select SUM(importe) AS total_importe FROM gasto where idUsuario = ? AND idGrupo = ?`, [id_user, id_group]);
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

const updateSpent = (id_spent, {idUsuario,importe,descripcion,fecha}) => {
    return db.query(
            `update gasto
            set idUsuario =?,
                importe = ?,
                descripcion = ?,
                fecha = ?
                where idGasto = ?`,
                [idUsuario,importe,descripcion,fecha,id_spent]
    )
};

const deleteSpentById = (id_spent) => {
    return db.query('delete from gasto where idGasto = ?', [id_spent]);       
};

const updateSaldo = (saldo, {idGrupo, idUsuario}) => {
    return db.query(`UPDATE grupo_usuario SET saldo = ? WHERE idGrupo = ? AND idUsuario = ?`, [saldo, idGrupo, idUsuario]);
};

const updateLiquidado = (idUsuario, idGrupo, importe) => {
    return db.query(`UPDATE grupo_usuario SET importe_liquidado = ? WHERE idGrupo = ? AND idUsuario = ?`, [importe, idGrupo, idUsuario]);
};

const selectPorcentaje = (idGrupo, idUsuario) => {
    return db.query(`SELECT porcentaje FROM grupo_usuario WHERE idGrupo = ? AND idUsuario = ?`, [idGrupo, idUsuario])
};

const selectSaldo = (idGrupo, idUsuario) => {
    return db.query(`SELECT saldo FROM grupo_usuario WHERE idGrupo = ? AND idUsuario = ?`, [idGrupo, idUsuario])
};

const selectLiquidado = (idUsuario, idGrupo) => {
    return db.query(`SELECT importe_liquidado FROM grupo_usuario WHERE idGrupo = ? AND idUsuario = ?`, [idGrupo, idUsuario])
};

// Exportación de módulos
module.exports = {
    selectSpentsByGroup,
    selectTotalSpentByUser,
    selectSpentById,
    selectTotalSpentByGroup,
    insertSpent,
    updateSpent,
    deleteSpentById,
    selectPorcentaje,
    updateSaldo,
    selectSaldo,
    updateLiquidado,
    selectLiquidado,
};