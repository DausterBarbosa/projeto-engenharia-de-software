import {Request, Response} from "express";

import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";

const prisma = new PrismaClient();

class SessionController{
    async login(req:Request, res:Response){
        const {email, senha} = req.body;

        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        if (!user){
            return res.status(400).json({error:true, status: "O Email informado não existe."});
        }

        const validPassword = await bcrypt.compareSync(senha, user.senha);

        if(!validPassword){
            return res.status(400).json({error:true, status: "Senha inválida."})
        }

        const token = jsonwebtoken.sign({
            user_id: user.id.toString()
        },
        "BATATINHA"
        ,{
            expiresIn: "60m"
        });

        return res.status(200).json({error:false, token});
    }
}

export default new SessionController();