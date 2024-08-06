const Usuario = require('../models/user');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const config = require('config');

class AuthService{
    async login(dto){
        const usuario = await Usuario.getById();

        if (!usuario) {
            throw new Error('Usuario não encontrado');
        }

        const authenticated = await compare(dto.password, usuario.password);

        if (!authenticated) {
            throw new Error('Usuario ou senha incorreto');
        }
        
        const accessToken = sign({
            id: usuario.id,
            name: usuario.name
        },config.get("secret"),{
            expiresIn: 86400
        })

        return { accessToken };
    }
}

module.exports = AuthService;