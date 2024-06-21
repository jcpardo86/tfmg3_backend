// Importación de módulos propios
const Message = require('../models/message.model');


// Definición de métodos para peticiones sobre tabla Mensaje

//Método para obtener el listado de gastos de un grupo a partir de su id de grupo
const getMessagesByGroup = async (req, res, next) => {

    try {
        const [ messages ] = await Message.selectMessages(req.params.id_group);
        res.json(messages);

    } catch(error) {
        next(error);
    };

};

//Exportación de módulo
module.exports= {
    getMessagesByGroup
};
