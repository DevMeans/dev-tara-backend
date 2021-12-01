const { Schema, model } = require('mongoose');

const MateriaPrimaSchema = Schema({
    turno: {
        type: String,
        default :'0'
    },
    fechaRegistro:{
        type:Date,
        default:Date
    },
    hora: {
        type: String,
        default: '0'
    },
    codigoOperario: {
        type: String,
        default: '0000'
    },
    nombreOperario: {
        type: String,
        default: 'sin nombre'
    },
    NumOrdenFab: {
        type: String,
        default: '0'
    },
    numLoteMP: {
        type: String,
        default: '0'
    },
    codigoMaterial: {
        type: String,
        default: '0'
    },
    descripcion:{
        type:String,
        default: 'descripcionCorta'
    },
    unidadMedida:{
        type:String,
        default: 'kg'
    },
    cantidad:{
        type:Number,
        default: 0
    }
})
MateriaPrimaSchema.methods.toJSON = function () {
    const { __v, _id, ...MateriaPrima } = this.toObject();
    MateriaPrima.uid = _id
    return MateriaPrima
}
module.exports = model('MateriaPrima', MateriaPrimaSchema)