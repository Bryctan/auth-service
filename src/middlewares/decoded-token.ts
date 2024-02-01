import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export const authorizetoken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenAuth = req.header('Authorization');

        if (!tokenAuth) {
            return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
        }

        let token = tokenAuth!.split(' ')[1];

        let secretKey = process.env.SECRET_KEY

        jwt.verify(token, secretKey!, (err: VerifyErrors | null, decoded:any) => {
            
            if (decoded){
                if (decoded.role === 'company') {
                    next();                
                } else {
                    res.status(401).json({
                        message: `unauthorized user`
                    }); 
                }
            } else {
                return res.status(401).json({ auth: false, message: 'Token inválido' });
            }

            
            if (err) {
                console.log("error", err);
                return res.status(401).json({ auth: false, message: 'Error al autenticar el token' });
            } 
            
        });

    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "failed to authenticate": error });
    }
};

