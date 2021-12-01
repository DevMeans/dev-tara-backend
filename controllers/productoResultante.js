const { request, response } = require("express")
const producto = require("../models/productoResultante")
const crearPR = async (req = request, res = response) => {
    const { codigoOperario, nombreOperario, turno, ...newBody } = req.body
    const { codigo, nombre } = req.usuario
    const fecha = new Date()
    const hora = fecha.getHours()
    if (hora > 6 && hora < 18) {
        console.log(hora)
        newBody.turno = 1
    } else {
        console.log(hora)
        newBody.turno = 2
    }
    newBody.codigoOperario = codigo
    newBody.nombreOperario = nombre
    newBody.fechaRegistro = fecha
    newBody.hora = hora
    const productoDB = new producto(newBody)
    await productoDB.save()
    return res.json({
        ok: true,
        msg: `producto creado`,
        result: productoDB
    })
}
const actualizarPR = async (req = request, res = response) => {

    const { estado, usuario, ...newBody } = req.body
    const idprod = req.params.id
    const { codigo, nombre } = req.usuario
    const fecha = new Date()
    const hora = fecha.getHours()
    if (hora > 6 && hora < 18) {
        console.log(hora)
        newBody.turno = 1
    } else {
        console.log(hora)
        newBody.turno = 2
    }
    newBody.codigoOperario = codigo
    newBody.nombreOperario = nombre
    newBody.fechaRegistro = fecha
    const productoDB = await producto.findByIdAndUpdate(idprod, newBody, { new: true })
    if (!productoDB) {
        return res.status(404).json({
            ok: false,
            msg: `Producto con el id ${idprod} no econtrado`
        })
    }
    return res.json({
        ok: false,
        msg: `producto actualizado correctamente`,
        result: productoDB
    })

}
const ObtenerPR = async (req = request, res = response) => {
    const { id } = req.params
    const productoDB = await producto.findById(id)
    if (!productoDB) {
        return res.status(404).json({
            ok: false,
            msg: `producto con el id ${id} no existe`
        })
    }
    return res.json({
        ok: true,
        result: productoDB

    })
}

const listarPR = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = Number(req.params)
    const [productos, total] = await Promise.all([
        producto.find().
            skip(desde).
            limit(limite),
        producto.count()
    ])
    res.json({
        ok: true,
        results: productos,
        total
    })

}
const eliminarPR = async (req = request, res = response) => {
    const { id } = req.params
    const productoDB = await producto.findByIdAndDelete(id)
    return res.json({
        ok: true,
        msg: `Producto Eliminado Exitosamente`
    })
}

module.exports = {
    crearPR,
    actualizarPR,
    ObtenerPR,
    listarPR,
    eliminarPR
}