import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async function authMiddleware(req, res, next) {
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
            if(!decoded) {
                return res.status(401).send({message: "Falha ao encontrar token"});
            }
            
            req.userId = decoded.id;

            return next();
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}