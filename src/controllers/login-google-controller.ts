import { Request, Response } from 'express';
import generateToken from '../helpers/generate-token';
import login from '../services/login';
import { validateTokenGoogle } from '../helpers/validate-token-google';

let token: any

export const get_token = async (req: Request, res: Response) => {
    token = await validateTokenGoogle(req.body.token)
    console.log(token);


    if (token != null) {
        res.status(200).json({ response: "ok" })
    } else {
        res.status(401).json({ response: "error authentication with google" })
    }
}


export const googleCompany = async (req: Request, res: Response) => {
    try {

        let data: any = {
            email_company: token.email
        }

        login.loginGoogleCompany(data, (error: any, id_company: string, _role: string) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                let secretKey: any = process.env.SECRET_KEY;
                let token: any = generateToken(
                    { role: _role, email: data.email_company, id: id_company },
                    secretKey, '30d'
                )
                return res.status(200).json({ status: 'Successful authentication', token: token });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }
};


export const googleGrocer = (req: Request, res: Response) => {
    try {
        const data: any = {
            email_grocer: token.email,
        }

        login.loginGoogleGrocer(data, (error: any, id_grocer: string, _role: string) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                let secretKey: any = process.env.SECRET_KEY;
                let token: any = generateToken(
                    { role: _role, email: data.email_grocer, id: id_grocer },
                    secretKey, '30d'
                )
                return res.status(200).json({ status: 'Successful authentication', token: token });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }
};