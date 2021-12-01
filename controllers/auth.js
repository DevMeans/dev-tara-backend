const { generarJWT } = require("../helpers/generar-jwt")
const bcryptjs = require('bcryptjs');
const usuario = require("../models/usuario")
const { request, response } = require("../routes/usuario")

const login = async (req = request, res = response) => {
    const { codigo, password } = req.body

    try {
        const usuarioDB = await usuario.findOne({ codigo })
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: `el codigo ${codigo} no existe`
            })
        }
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: `el password es incorrecto`
            })
        }
        token = await generarJWT(usuarioDB.id)
        return res.json({
            ok: true,
            msg: `token generado exitosamente`,
            token

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: `error en la consulta hable con el administrador`
        })
    }

}
const renovarToken = async (req = request, res = response) => {
    
    const id = req.usuario._id
    const usuario = req.usuario
    //console.log(id)
    const token = await generarJWT(id)


    res.json({
        ok: true,
        msg: 'Estas en el renovar token',
        token,
        usuario
    })
}
module.exports = {
    login,
    renovarToken
}