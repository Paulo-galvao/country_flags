import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from "../models/User.js"

export default async function authMiddeware(req, res, next) {
    try {
        const secretkey = process.env.SECRET_KEY;
        const { authorization } = req.headers;

        if(!authorization) {
            return res.status(401).send({message: "Usuário não autorizado"});
        }

        const parts = authorization.split(" ");
        const [schema, token] = parts;

        if(schema !== "Bearer") {
            return res.status(401).send({message: "Usuário não autorizado"});
        }

        jwt.verify( token, secretkey, async( error, decoded ) => {
            req.userId = decoded.id;
            await User.findByPk(req.userId);

            return next();
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}