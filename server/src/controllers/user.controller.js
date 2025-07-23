import User from "../models/User.js";
import Flag from "../models/Flag.js";
import generateToken from "../services/generateToken.js";
import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";

export async function index(req, res) {
    try {
        const users = await User.findAll();
        
        res.status(200).send(users); 
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function show(req, res) {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        const flags = await Flag.findAll({
            where: {
                user_id: id 
            },
                order: [
                    ["name"],
                ]   
        });
        
        res.status(200).send({user, flags}); 
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signup(req, res) {
    try {
        const {username, password } = req.body;

        if(!username || !password) {
            res.status(400).send({message: "Erro: Preencha todos os campos"});
        }

        

        const user = await User.create({username, password});

        

        const token = generateToken(user.id);
        
        res.status(201).send({
            message: "Usuário cadastrado com sucesso",
            token
        });
    } catch (error) {
        if(error instanceof Sequelize.UniqueConstraintError) {
            return res.status(400).send({message: "Usuário já existe"})
        }
        res.status(500).send(error.message);
    }
}

export async function login(req, res) {
    try {
        const {username, password } = req.body;

        if(!username || !password) {
            res.status(400).send({message: "Erro: Preencha todos os campos"});
        }

        const user = await User.findOne({where: { username }});

        if(!user) {
            res.status(404).send({message: "Erro: Usuário não encontrado"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            res.status(404).send({message: "Erro: Senha incorreta"});
        }

        const token = generateToken(user.id);

        res.status(200).send({
            message: "Login realizado com sucesso",
            token,
            user: user.username
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}