import {Request, Response} from "express";

import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class UserController{
    async getUser(req:Request, res:Response){
        const result = await prisma.user.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });

        if (!result){
            return res.status(400).json({status:"Usuário não encontrado."});
        }

        return res.status(200).json(result);
    }

    async create(req:Request, res:Response){
        const {nome, sobrenome, email, senha} = req.body;

        const emailVerification = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        if (emailVerification){
            return res.status(400).json({status: "Email já cadastrado."})
        }

        const hash = await bcrypt.hash(senha, 5);

        await prisma.user.create({
            data: {
                nome, sobrenome, email, senha: hash
            }
        });

        return res.status(200).json({status:"Usuário cadastrado com sucesso."});
    }

    update(req:Request, res:Response){

    }

    delete(req:Request, res:Response){

    }
}

export default new UserController();