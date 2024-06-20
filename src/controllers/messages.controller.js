// Importación de módulos propios
const Message = require('../models/message.model');


// Definición de métodos para peticiones sobre tabla Mensaje

const getMessagesByGroup = async (req, res, next) => {

    try {
        const [ messages ] = await Message.selectMessages(req.params.id_group);
        res.json(messages);

    } catch(error) {
        next(error);
    };

};

module.exports= {
    getMessagesByGroup
};
