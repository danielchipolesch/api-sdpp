const express = require('express');
const router = express.Router();

const ContrachequeController = require('../controllers/contrachequesController');

router.get('/:anoInicio/:mesInicio/:anoFim/:mesFim/:nordem', ContrachequeController.getContracheques);
router.get('/:ano/:mes/:nordem', ContrachequeController.getUmContracheque);

module.exports = router;