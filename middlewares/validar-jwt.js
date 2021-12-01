const jwt=require('jsonwebtoken')
const { request, response } = require("express");
const usuario = require('../models/usuario');

const validarjwt=async (req=request,res=response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(404).json({
            ok:false,
            msg:`token no valido`
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        const usuarioDB= await usuario.findById(uid)

        req.usuario=usuarioDB
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok:false,
            msg:`token no valido`
        })
    }

}
module.exports={
    validarjwt
}