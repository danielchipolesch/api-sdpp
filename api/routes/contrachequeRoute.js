const express = require('express');
const router = express.Router();

const ContrachequeController = require('../controllers/ContrachequeController');

/**
 * @swagger
 * components:
 *  schemas:
 *    Contracheques:
 *      type: object
 *      required:
 *        - title:
 *        - author
 *      properties:
 *        anoInicio:
 *          type: string
 *          description: Ano de início da pesquisa
 *        mesInicio:
 *          type: string
 *          description: Mês de início da pesquisa
 *        anoFim:
 *          type: string
 *          description: Ano do final da pesquisa
 *        mesFim:
 *          type: string
 *          description: Mês do final da pesquisa
 *        nordem:
 *          type: string
 *          description: Nº de ordem com 6 dígitos
 *      example: 
 *          anoInicio: 2014
 *          mesInicio: jan
 *          anoFim: 2021
 *          mesFim: dez
 *          nordem: "123456"
 */
 
router.get('/:anoInicio/:mesInicio/:anoFim/:mesFim/:nordem', ContrachequeController.getContracheques);

router.get('/:ano/:mes/:nordem', ContrachequeController.getUmContracheque);

router.get('/pdf/:ano/:mes/:nordem', ContrachequeController.getContrachequePdf);

module.exports = router;