const User = require('../models/user');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const config = require('config');

class AuthService{
    async login(dto){
        const user = User.getById();

        if (!user) {
            throw new Error('Usuario não encontrado');
        }

        const authenticated = await compare(dto.password, user.password);

        if (!authenticated) {
            throw new Error('Usuario ou senha incorreto');
        }
        
        const accessToken = sign({
            id: user.id,
            name: user.name
        },config.get("secret"),{
            expiresIn: 86400
        })

        return { accessToken };
    }
}

module.exports = AuthService;