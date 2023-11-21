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

    async update(req:Request, res:Response){
        const result = await prisma.user.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });

        if(!result){
            return res.status(400).json({status: "ID de usuário não encontrado."});
        }

        const {nome, sobrenome} = req.body;

        await prisma.user.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                nome, sobrenome
            }
        });

        return res.status(200).json({status:"Dados do usuário alterados com sucesso."});
    }

    async delete(req:Request, res:Response){
        const result = await prisma.user.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });

        if(!result){
            return res.status(400).json({status: "ID de usuário não encontrado."});
        }

        await prisma.user.delete({
            where:{
                id: parseInt(req.params.id)
            }
        });

        return res.status(200).json({status:"Usuário deletado com sucesso."});
    }
}

export default new UserController();