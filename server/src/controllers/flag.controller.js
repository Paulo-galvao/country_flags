import { literal } from "sequelize";
import Flag from "../models/Flag.js";

export async function index(req, res) {
    try {
        const flags = await Flag.findAll({
            order: [
                ["name"],
            ]
        });

        res.status(200).send(flags);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function show(req, res) {
    try {
        const id = req.params.id;
        const flag = await Flag.findByPk(id);

        res.status(200).send(flag);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function create(req, res) {
    try {
        const {name, continent, population, capital, flag_url } = req.body;

        if(!name || !continent | !population || !capital || ! flag_url) {
            res.status(400).send({message: "Erro: Preencha todos os campos"});
        }

        const flag = await Flag.create({
            name, continent, population, capital, flag_url, user_id: req.userId
        });


        res.status(201).send({
            message: "Bandeira cadastrada com sucesso",
            flag
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function update(req, res) {
    try {
        const id = req.params.id;

        const {name, continent, population, capital, flag_url } = req.body;

        if(!name || !continent || !population || !capital || ! flag_url) {
            res.status(400).send({message: "Erro: Preencha todos os campos"});
        }

        const flag = await Flag.findByPk(id);
        const userId = flag.user_id;

        if(req.userId != userId) {
            res.status(403).send({ message: "Erro: não permitido alterar post de outro usuário"});
        } 
        

        await Flag.update(
            {name, continent, population, capital, flag_url, user_id: userId },
            {
            where: {
                id: id
            }});

        res.status(200).send({message: "Atualizado com sucesso"});

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function destroy(req, res) {
    try {
        const id = req.params.id;

        await Flag.destroy({
            where: {id: id}
        })

        res.status(200).send({message: "Excluido com sucesso"});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function search(req, res) {
    try {
        const { name } = req.query;

        if(!name ) {
            res.status(400).send({ message: "Campo de pesquisa não pode estar vazio" })
        }

        const flag = await Flag.findOne({
            
            where: literal(`unaccent("name") ILIKE unaccent('%${name}%')`) // ignore diacríticos
        });

        if(!flag) {
            res.status(400).send({message: "Nenhum resultado encontrado"});
        }

        res.status(200).send({message: "Success",flag});

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function filter(req, res) {
    try {
        const { continent } = req.query;

        if(!continent ) {
            res.status(400).send({ message: "Campo de pesquisa não pode estar vazio" })
        }

        const flag = await Flag.findOne({
            where: { continent }
        });

        res.status(200).send(flag);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function orderBy(req, res) {
    try {
        const flags = await Flag.findAll( {
           order: [
                ['population', 'DESC']
            ]
        } );

        res.status(200).send(flags);

    } catch (error) {
        res.status(500).send(error.message);
    }
}