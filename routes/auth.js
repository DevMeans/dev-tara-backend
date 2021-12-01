const Router = require("express");
const { check } = require("express-validator");
const { login, renovarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router()
router.post('/', [
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('password', 'el password no debe estar vacio').notEmpty(),
    validarCampos
],
    login)
router.get('/renovarToken', [
    validarjwt
], renovarToken)
module.exports = router