import Flag from "../models/Flag.js";

export async function index(req, res) {
    try {
        const flags = await Flag.findAll();

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
            name, continent, population, capital, flag_url, user_id: 1
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

        if(!name || !continent | !population || !capital || ! flag_url) {
            res.status(400).send({message: "Erro: Preencha todos os campos"});
        }

        await Flag.update(
            {name, continent, population, capital, flag_url },
            {
            where: {
                id: id
            }});

        res.status(200).send({message: "Bandeira atualizada com sucesso"});

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

        res.status(200).send({message: "Bandeira excluida com sucesso"});
    } catch (error) {
        res.status(500).send(error.message);
    }
}