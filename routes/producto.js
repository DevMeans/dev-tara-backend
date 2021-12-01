const Router = require("express");
const { check } = require("express-validator");
const { ObtenerProducto, listarProductos, crearProducto, actualizarProducto, actualizarEstado, eliminarProductos } = require("../controllers/producto");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router()

router.get('/:id', [

],
    ObtenerProducto)

router.get('/', [

],
    listarProductos)

router.post('/', [
    validarjwt,
    check('NumOrdenFab', 'Se requiere orden de fabricacion /Solo numeros').notEmpty().isNumeric(),
    check('numLoteMP', 'Se requiere numero de lote').notEmpty(),
    check('codigoMaterial', 'Se requiere codigo de material').notEmpty(),
    check('descripcion', 'Se requiere una corta descripcion').notEmpty(),
    validarCampos
],
    crearProducto)

router.put('/:id', [
    validarjwt,
    validarCampos
],
    actualizarProducto)
router.delete('/:id', [
    validarjwt,
    validarCampos
],
    eliminarProductos)
module.exports = router