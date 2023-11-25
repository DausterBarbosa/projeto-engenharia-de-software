import {Request, Response, NextFunction} from "express";

import jsonwebtoken from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function authMiddleware(req:Request, res:Response, next:NextFunction){
    const {authorization} = req.headers;

    const token = authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({error:true, status:"Token de autenticação não encontrado."});
    }

    try {
        const decode = jsonwebtoken.verify(token, "BATATINHA") as any;

        const user = await prisma.user.findFirst({
            where:{
                id: parseInt(decode.user_id),
            }
        });

        if (!user){
            return res.status(400).json({error:true, status:"Usuário não encontrado."});
        }

        req.user_id = user.id;

        next();
    } catch (error) {
        return res.status(401).json({error:true, status:"Token inválido."});
    }
}