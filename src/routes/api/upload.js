
const uploadUserImage = require('../../controllers/uploadUserImage.controller');
const uploadGroupImage = require('../../controllers/uploadGroupImage.controller');


const router = require('express').Router();


router.post('/userimage', uploadUserImage.upload, uploadUserImage.uploadUserImage);
router.post('/groupimage', uploadGroupImage.upload , uploadGroupImage.uploadGroupImage);

//LARA - Me llevo este router a la ruta de users
//router.get('/userimage/:id_user', imagesController.getImage);

//router.post('/groupimage', groupImageController.upload, groupImageController.uploadImage);

//router.get('/groupimage/:id_group', groupImageController.getGroupImage);


module.exports = router;
