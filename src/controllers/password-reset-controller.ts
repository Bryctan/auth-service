import  jwt  from "jsonwebtoken";
import { Request, Response } from "express";
import {
  verifyCompany,
  verifyGrocer,
  updatePassword
} from "../services/reset-password-service";
import generateToken from "../helpers/generate-token";
import { generateEmail, emailConfirmation } from "../helpers/generate-email";
import "dotenv/config";

export const resetPasswordGrocer = async (req: Request, res: Response) => {
  try {
    const emailGrocer = req.body.email_grocer;

    verifyGrocer(emailGrocer, (error: any, result: any) => {
      if (error) {
        res.status(500).json({ error: error.message });
      }

      if (result) {
        let secret_key: any = process.env.SECRET_KEY;
        let token: any = generateToken(
          { role: "grocer", email: emailGrocer },
          secret_key,
          new Date().getTime() + 2 * 60 * 1000
        );

        generateEmail(token, emailGrocer, req, res);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      message: `error reset password`,
    });
  }
};

export const resetPasswordCompany = async (req: Request, res: Response) => {
  try {
    const emailCompany = req.body.email_company;

    verifyCompany(emailCompany, (error: any, result: any) => {
      if (error) {
        res.status(500).json({ error: error.message });
      }

      if (result) {
        let secret_key: any = process.env.SECRET_KEY;
        let token: any = generateToken(
          { role: "company", email: emailCompany },
          secret_key,
          new Date().getTime() + 2 * 60 * 1000
        );

        generateEmail(token, emailCompany, req, res);
      }
    });
  } catch (error) {}
};


export const resetPassword = async (req: Request, res: Response) => {
    const token = req.params.t;
    let secret_key: any = process.env.SECRET_KEY;

    try {
      /*
        //const decoded = jwt.verify(token, secret_key);
        //const expirationTimeInSeconds: number = decoded.exp;
       // console.log(decoded.exp);
        
      const currentTimeInSeconds: number = Math.floor(Date.now() / 1000);
        //const exp: any = decoded;
        //const expirationDate = new Date(exp * 1000);

        if (expirationTimeInSeconds < currentTimeInSeconds) {
          console.log("Token expirado");
          return res.status(400).json({ message: "El token ha expirado" });
         if (expirationDate < new Date()) {
            console.log("Token expirado");    
            return res.status(400).json({ message: "El token ha expirado" });
            
        } else {
            let { email }: any = decoded;
            let { role }: any = decoded;
            let password = req.body.password;

            updatePassword(email, role, password, (error: any, result: any) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                else{
                    emailConfirmation (email,req,res);
                    console.log("Correo enviado exitodamente");
                    
                    return res.status(200).json({ message: result[0][0].message_text });
                } 
            });
        }
        */
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: `Error al actualizar la contraseña`,
        });

    }
};