const Router = require("express");
const { check } = require("express-validator");
const { ObtenerPR, listarPR, crearPR, actualizarPR, eliminarPR } = require("../controllers/ProductoResultante");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router()

router.get('/:id', [
],
    ObtenerPR)
router.get('/', [
],
    listarPR)
router.post('/', [
    validarjwt,
    check('NumOrdenFab', 'Se requiere orden de fabricacion').isNumeric(),
    check('numLotePT', 'Se requiere numero de lote').notEmpty(),
    check('codigoMaterial', 'Se requiere codigo de material').notEmpty(),
    check('descripcion', 'Se requiere una corta descripcion').notEmpty(),
    validarCampos
],
    crearPR)

router.put('/:id', [
    validarjwt,
    validarCampos
],
    actualizarPR)
router.delete('/:id', [
    validarjwt,
    validarCampos
],
    eliminarPR)
module.exports = router