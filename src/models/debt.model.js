// Definición de métodos para interactuar con tabla Deuda

const selectDebtsByGroup = (id_group) => {
    return db.query(`select * FROM deuda WHERE idGrupo = ?`, [id_group]);
};

const selectDebt = (id_group, idPagador, idReceptor) => {
    return db.query(`select * FROM deuda WHERE idGrupo = ? AND idUsuario = ? AND receptor = ?`, [id_group, idPagador, idReceptor]);
}

const updateDebtById = (id_debt, importe) => {
    return db.query(`update deuda set importe = ?  WHERE idDeuda = ?`, [importe, id_debt]);
}

const updateStatus = (id_debt) => {
    return db.query(`update deuda set is_pagada = 1  WHERE idDeuda = ?`, [id_debt]);
}

const insertDebt = ({idGrupo, idPagador, idReceptor, importe}) => {
    return db.query(`INSERT INTO deuda (idGrupo, idUsuario, receptor, importe) VALUES (?, ?, ?, ?)`, [idGrupo, idPagador, idReceptor, importe])
}

const deleteDebtById = (id_debt) => {
    return db.query(`DELETE FROM deuda WHERE idDeuda = ?`, [id_debt]);
}

// Exportación de módulos
module.exports = {
 selectDebtsByGroup,
 selectDebt,
 updateDebtById,
 insertDebt,
 deleteDebtById,
 updateStatus
};