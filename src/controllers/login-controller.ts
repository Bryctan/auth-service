import { Request, Response } from 'express';
import generateToken from '../helpers/generate-token';
import login from '../services/login';

export const company = async (req: Request, res: Response) => {
    try {
        let { email_company, password_company } = req.body;

        const data: any = {
            email_company,
            password_company
        }

        login.loginCompany(data, (error: any, verifiedPassword: any, id_company: string, _role: string) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                if (verifiedPassword) {
                    let secretKey: any = process.env.SECRET_KEY;
                    let token: any = generateToken(
                        { role: _role, email: email_company, id: id_company },
                        secretKey, new Date().getTime() + (2 * 60 * 1000)
                    )
                    return res.status(200).json({ status: 'Successful authentication', token: token });
                } else {
                    return res.status(401).json({ Status: 'Incorrect credentials' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }
};

export const provider = (req: Request, res: Response) => {

    try {
        let { email_provider, password_provider } = req.body;

        const data: any = {
            email_provider,
            password_provider
        }

        login.loginProvider(data, (error: any, verifiedPassword: any, id_provider: string, _role: string) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                if (verifiedPassword) {
                    let secretKey: any = process.env.SECRET_KEY;
                    let token: any = generateToken(
                        { role: _role, email: email_provider, id: id_provider },
                        secretKey, new Date().getTime() + (2 * 60 * 1000)
                    )
                    return res.status(200).json({ status: 'Successful authentication', token: token });
                } else {
                    return res.status(401).json({ Status: 'Incorrect credentials' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }
};

export const grocer = (req: Request, res: Response) => {
    try {
        let { email_grocer, password_grocer } = req.body;

        const data: any = {
            email_grocer,
            password_grocer
        }

        login.loginGrocer(data, (error: any, verifiedPassword: any, id_grocer: string, _role: string) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                if (verifiedPassword) {
                    let secretKey: any = process.env.SECRET_KEY;
                    let token: any = generateToken(
                        { role: _role, email: email_grocer, id: id_grocer },
                        secretKey, new Date().getTime() + (2 * 60 * 1000)
                    )
                    return res.status(200).json({ status: 'Successful authentication', token: token });
                } else {
                    return res.status(401).json({ Status: 'Incorrect credentials' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }
};

export const hello = (req:Request , res:Response) =>  {
    res.send("Hello titi")
}