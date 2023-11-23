import {Request, Response} from "express";

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class TrainingController {
    async getAllTrainings(req:Request, res:Response){
        const result = await prisma.user.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });

        if (!result){
            return res.status(400).json({error:true, status:"Usuário não encontrado."});
        }

        const trainings = await prisma.training.findMany({
            where:{
                userId: parseInt(req.params.id),
            }
        });

        return res.status(200).json({error:false, trainings});
    }

    async create(req:Request, res:Response){
        const {nome, repeticoes, secoes, carga, diadasemana, userid} = req.body;

        await prisma.training.create({
            data: {
                nome,
                repeticoes: parseInt(repeticoes),
                secoes: parseInt(secoes),
                carga: parseInt(carga),
                diadasemana: parseInt(diadasemana),
                userId: parseInt(userid)
            }
        });

        return res.status(200).json({error:false, status:"Treino criado com sucesso."});
    }

    async update(req:Request, res:Response){
        const {nome, repeticoes, secoes, carga, diadasemana, userid} = req.body;

        await prisma.training.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                nome,
                repeticoes: parseInt(repeticoes),
                secoes: parseInt(secoes),
                carga: parseInt(carga),
                diadasemana: parseInt(diadasemana),
                userId: parseInt(userid)
            }
        });

        return res.status(200).json({error:false, status:"Treino editado com sucesso."});
    }

    async delete(req:Request, res:Response){
        const result = await prisma.training.findFirst({
            where:{
                id: parseInt(req.params.id),
            }
        });

        if(!result){
            return res.status(400).json({error:true, status: "ID de treino não encontrado."});
        }

        await prisma.training.delete({
            where:{
                id: parseInt(req.params.id)
            }
        });

        return res.status(200).json({error:false, status:"Treino deletado com sucesso."});
    }
}

export default new TrainingController();