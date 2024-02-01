import { createConnection } from '../config/db-config';
import comparePassword from "../helpers/compare-password";

const loginCompany = (data: any, callback: any) => {

    const getCompanyQuery = 'call get_data_company(?);'
    const connection = createConnection();

    try {
        connection.query(getCompanyQuery, [data.email_company], (error: any, results: any) => {
            if (error) {
                return callback(error);
            }
            let idCompany: string = results[0][0].nit_company;
            let storedPassword: string = results[0][0].password_company;
            let role: string = results[0][0].fk_name_rol;
            let verifiedPassword = comparePassword(data.password_company, storedPassword);
            connection.end();
            callback(null, verifiedPassword, idCompany, role);
        });
    } catch (error) {
        return callback(error);
    }
    
}

const loginProvider = (data: any, callback: any) => {

    const getProviderQuery = 'call get_data_provider(?);'
    const connection = createConnection();
    try {
        connection.query(getProviderQuery, [data.email_provider], (error: any, results: any) => {
            if (error) {
                return callback(error);
            }
            let idProvider: string = results[0][0].document_provider;
            let storedPassword: string = results[0][0].password_provider;
            let role: string = results[0][0].fk_name_rol;
            let verifiedPassword = comparePassword(data.password_provider, storedPassword);
            connection.end();
            callback(null, verifiedPassword, idProvider, role);
        });
    } catch (error) {
        return callback(error);
    }
}

const loginGrocer = (data: any, callback: any) => {

    const getGrocerQuery = 'call get_data_grocer(?);'
    const connection = createConnection();
    try {
        connection.query(getGrocerQuery, [data.email_grocer], (error: any, results: any) => {
            if (error) {
                return callback(error);
            }
            let idGrocer: string = results[0][0].document_grocer;
            let storedPassword: string = results[0][0].password_grocer;
            let role: string = results[0][0].fk_name_rol;
            let verifiedPassword = comparePassword(data.password_grocer, storedPassword);
            connection.end();
            callback(null, verifiedPassword, idGrocer, role);
        
        });
    } catch (error) {
        return callback(error);
    }
}

export default {
    loginCompany,
    loginProvider,
    loginGrocer
}