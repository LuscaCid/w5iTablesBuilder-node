import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { W5iUser } from "@Types/User";
import { AppError } from "src/utils/AppError";

declare module 'express' {
  interface Request {
    user : Partial<W5iUser>
  }
}
/**
 * @Summary Classe Que Vai funcionar como um intermediador de requisicoes com base no metodo de autenticacao com a conta do google ou provedor padrao de emaqil e senha 
 * @author Lucas Cid <lucasfelipaaa@gmail.com>
 * @created 21/10/2024
 */
export class AuthMiddleware implements NestMiddleware 
{
  static readonly admin = admin.initializeApp({
    credential: admin.credential.cert('firebase.json')
  });
  async use(req: Request, res : Response, next: NextFunction) {
    const auth = admin.auth();
    let authorization = req.headers.authorization;
    if (!authorization) throw new AppError("Token nao passado!", 401);
      //valida token enviado pelos headers, se caso o usuario estiver autenticado, ele pode fazer a requisicao
    if (authorization.includes("Bearer"))
    {
      authorization = authorization.split(" ")[1]
    }
    const decoded = await auth.verifyIdToken(authorization)
    req.user = {
      ...decoded,
      uid : decoded.uid,
      email : decoded.email!,
    }
    return next();
  }
}