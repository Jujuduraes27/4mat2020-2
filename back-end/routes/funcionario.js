const controller = require('../controllers/funcionario')
const express = require('express')

const router = express.Router()

router.post('/',controller.novo)// Create
router.get('/',controller.listar)// Retriever(all)
router.get('/:id',controller.obterUm) // Retriever(one)
router.put('/',controller.atualizar) // UPDATE
router.delete('/',controller.excluir) // DELETE
module.exports = router