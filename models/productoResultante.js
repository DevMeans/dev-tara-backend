const { Schema, model } = require('mongoose');
const ProductoResultanteSchema = Schema({
    turno: {
        type: String,
        default: '0'
    },
    fechaRegistro: {
        type: Date,
        default: Date
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
    numLotePT: {
        type: String,
        default: '0'
    },
    codigoMaterial: {
        type: String,
        default: '0'
    },
    descripcion: {
        type: String,
        default: 'descripcionCorta'
    },
    unidadMedida: {
        type: String,
        default: 'kg'
    },
    cantidad: {
        type: Number,
        default: 0
    }
})
ProductoResultanteSchema.methods.toJSON = function () {
    const { __v, _id, codigoOperario, nombreOperario, ...ProductoResultante } = this.toObject();
    ProductoResultante.uid = _id
    return ProductoResultante
}
module.exports = model('ProductoResultante', ProductoResultanteSchema)