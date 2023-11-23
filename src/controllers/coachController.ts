import { Request, Response } from "express";

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class CoachController{
    async getAllUsers(req:Request, res:Response){
        const users = await prisma.user.findMany({
            select:{
                id:true,
                nome:true,
                sobrenome:true,
                email:true,
            }
        });

        return res.status(200).json(users);
    }

    async deleteUser(req:Request, res:Response){
        const result = await prisma.user.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });

        if(!result){
            return res.status(400).json({error:true, status: "ID de usuário não encontrado."});
        }

        await prisma.user.delete({
            where:{
                id: parseInt(req.params.id)
            }
        });

        return res.status(200).json({error:false, status:"Usuário deletado com sucesso."});
    }
}

export default new CoachController();