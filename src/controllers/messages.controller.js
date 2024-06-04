// Importación de módulos propios
const Message = require('../models/message.model');

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
