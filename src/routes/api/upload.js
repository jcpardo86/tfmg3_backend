const router = require('express').Router();

const imagesController = require('../../controllers/upload.controller');


router.post('/userImage', imagesController.upload, imagesController.uploadImage);

module.exports = router;
