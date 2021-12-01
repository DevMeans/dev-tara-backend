const express = require('express')
const cors = require('cors')
const { ConexionMongoDB } = require('../database/config')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            usuario: '/api/usuario',
            auth: '/api/auth',
            producto:'/api/producto',
            pr:'/api/PResultantes'
        }
        this.conexMongoDB()
        this.middlewares()
        this.routes()
    }
    async conexMongoDB() {
        await ConexionMongoDB()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    routes() {
        this.app.use(this.paths.usuario, require('../routes/usuario'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.producto, require('../routes/producto'))
        this.app.use(this.paths.pr, require('../routes/pr'))
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto  ${this.port}`))
    }

}
module.exports = {
    Server
}