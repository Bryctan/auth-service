import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import register from '../services/register';
import { generateWelcomeEmail } from '../helpers/generate-email';
import { validateTokenGoogle } from '../helpers/validate-token-google';
import Company from '../models/Company';
import Grocer from '../models/Grocer';

let token: any;

export const get_token = async (req: Request, res: Response) => {
    token = await validateTokenGoogle(req.body.token)

    if (token != null) {
        res.status(200).json({ response: "ok" })
    } else {
        
        res.status(401).json({ response: "error authentication with google" })
    }
}

export const companyGoogle = async (req: Request, res: Response) => {

    try {
        const {
            nit_company,
            name_company,
            password_company,
            national_line_company,
            profile_photo_company,
            cover_photo_company,
            foundation_company,
            description_company
        } = req.body;

        console.log(token);


        const password_hash = await bcrypt.hash(password_company, 10);

        console.log(password_hash);

        let email = token!.email

        const data: Company = {
            nit_company,
            name_company,
            email_company: email!,
            password_company: password_hash,
            profile_photo_company,
            cover_photo_company,
            national_line_company,
            foundation_company,
            description_company
        };

        register.registerCompany(data, (error: any, result: any) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                generateWelcomeEmail(data.email_company, data.name_company, req, res);
                res.status(200).json({ "Status": result[0][0].message_text });
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error,
            message: `error registering company`
        });
    }


}

export const grocerGoogle = async (req: Request, res: Response) => {

    try {
        const {
            document_grocer,
            name_store,
            cover_photo_grocer,
            city_grocer,
            password_grocer,
            neighborhood,
            street,
            number_street,
            apartment,
            number_grocer
        } = req.body;

        const password_hash = await bcrypt.hash(password_grocer, 10);

        let info: any = {
            name: token.given_name,
            last_name: token.family_name,
            email: token.email,
            profile: token.picture
        }

        const data: Grocer = {
            document_grocer,
            name_grocer: info.name,
            last_name_grocer: info.last_name,
            email_grocer: info.email,
            name_store,
            profile_photo_grocer: info.profile,
            cover_photo_grocer,
            city_grocer,
            password_grocer: password_hash,
            neighborhood,
            street,
            number_street,
            apartment,
            number_grocer
        };

        register.registerGrocer(data, (error: any, result: any) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else {
                generateWelcomeEmail(data.email_grocer, data.name_grocer, req, res);
                res.status(200).json({ "Status": result[0][0].message_text });
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error,
            message: `error registering grocer`
        });
    }

}
