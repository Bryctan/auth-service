//import connection from '../config/db-config';
import Company from '../models/Company';
import Provider from '../models/Provider';
import Grocer from '../models/Grocer';


/*
const registerCompany = (data: Company, callback: any) => {
    const procInsertCompanyQuery = 'call insertCompany (?,?,?,?,?,?,?,?,?,"company",@message_text);';
    try {
        connection.query(procInsertCompanyQuery, [
            data.nit_company, data.name_company, data.email_company, data.password_company,
            data.national_line_company, data.profile_photo_company, data.cover_photo_company,
            data.foundation_company, data.description_company
        ], (error: any, results: any) => {
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }
};

const registerProvider = (data: Provider, callback: any) => {
    const procInsertProviderQuery = 'call insertProvider (?,?,?,?,?,?,?,"provider",?,?,?,?,?,@message_text);';
    try {
        connection.query(procInsertProviderQuery, [data.document_provider, data.name_provider, data.last_name_provider,
        data.email_provider, data.password_provider, data.profile_photo_provider, data.nit_company, data.city_provider,
        data.neighborhood, data.street, data.number_street, data.number_provider], (error: any, results: any) => {
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }
}

const registerGrocer = (data: Grocer, callback: any) => {
    const procInsertGrocerQuery = 'call insertGrocer(?,?,?,?,?,?,?,?,?,"grocer",?,?,?,?,?,@message_text);';
    try {
        connection.query(procInsertGrocerQuery, [data.document_grocer, data.name_grocer, data.last_name_grocer, data.email_grocer,
        data.name_store, data.profile_photo_grocer, data.cover_photo_grocer, data.city_grocer, data.password_grocer, data.neighborhood,
        data.street, data.number_street, data.apartment, data.number_grocer], (error: any, results: any) => {
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }
};

*/

import pool from '../config/db-config';

const registerCompany = (data: Company, callback: any) => {

    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err);
        }

    const procInsertCompanyQuery = 'call insertCompany (?,?,?,?,?,?,?,?,?,"company",@message_text);';
    try {
        connection.query(procInsertCompanyQuery, [
            data.nit_company, data.name_company, data.email_company, data.password_company,
            data.national_line_company, data.profile_photo_company, data.cover_photo_company,
            data.foundation_company, data.description_company
        ], (error: any, results: any) => {
            connection.release()
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }

    });

};

const registerProvider = (data: Provider, callback: any) => {

    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err);
        }

    const procInsertProviderQuery = 'call insertProvider (?,?,?,?,?,?,?,"provider",?,?,?,?,?,@message_text);';
    try {
        connection.query(procInsertProviderQuery, [data.document_provider, data.name_provider, data.last_name_provider,
        data.email_provider, data.password_provider, data.profile_photo_provider, data.nit_company, data.city_provider,
        data.neighborhood, data.street, data.number_street, data.number_provider], (error: any, results: any) => {
            connection.release()
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }

    });
}

const registerGrocer = (data: Grocer, callback: any) => {

    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err);
        }

    const procInsertGrocerQuery = 'call insertGrocer(?,?,?,?,?,?,?,?,?,"grocer",?,?,?,?,?,@message_text);';
    try {
        connection.query(procInsertGrocerQuery, [data.document_grocer, data.name_grocer, data.last_name_grocer, data.email_grocer,
        data.name_store, data.profile_photo_grocer, data.cover_photo_grocer, data.city_grocer, data.password_grocer, data.neighborhood,
        data.street, data.number_street, data.apartment, data.number_grocer], (error: any, results: any) => {
            connection.release();
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }
});
};



export default {
    registerCompany,
    registerProvider,
    registerGrocer
}