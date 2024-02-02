//import connection from "../config/db-config";
import bcrypt from "bcrypt";

/*

export const verifyGrocer = (emailGrocer: any, callback: any) => {
  const grocerExisting = "call getGrocerEmailExist(?,@message_text);";
  try {
    connection.query(
      grocerExisting,
      emailGrocer,
      (error: any, results: any) => {
        if (error) {
          return callback(error);
        }
        callback(null, results);
      }
    );
  } catch (error) {
    return callback(error);
  }
};

export const verifyCompany = (emailProvider: any, callback: any) => {
  const providerExisting = "call getCompany_EmailExist (?,@message_text);";
  try {
    connection.query(
      providerExisting,
      emailProvider,
      (error: any, result: any) => {
        if (error) {
          return callback(error);
        }
        callback(null, result);
      }
    );
  } catch (error) {
    return callback(error);
  }
};

export const updatePassword = async (
  email: any,
  role: any,
  password: any,
  callback: any
) => {
  const password_hash = await bcrypt.hash(password, 10);

  const data: { email: string; password: string }[] = [
    { email: email, password: password_hash },
  ];

  const updatePasswordGrocer = "call updatePassword_Grocer(?,?,@message_text);";
  const updatePasswordCompany = "call updatePasswordCompany(?,?,@message_text);";
  try {
    if (role == "grocer") {
      connection.query(
        updatePasswordGrocer,
        [email, password_hash],
        (error: any, result: any) => {
          if (error) {
            return callback(error);
          }
          callback(null, result);
        }
      );
    } else {
      connection.query(
        updatePasswordCompany,
        [email, password_hash],
        (error: any, result: any) => {
          if (error) {
            return callback(error);
          }
          callback(null, result);
        }
      );
    }
  } catch (error) {
    return callback(error);
  }
};
*/

import pool from '../config/db-config';

export const verifyGrocer = (emailGrocer: any, callback: any) => {

  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err);
    }

    const grocerExisting = "call getGrocerEmailExist(?,@message_text);";

    try {
      connection.query(grocerExisting, emailGrocer, (error: any, results: any) => {
        connection.release();
        if (error) {
          return callback(error);
        }
        callback(null, results);
      }
      );
    } catch (error) {
      return callback(error);
    }

  });
};

export const verifyCompany = (emailProvider: any, callback: any) => {

  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err);
    }

    const providerExisting = "call getCompany_EmailExist (?,@message_text);";

    try {
      connection.query(providerExisting, emailProvider, (error: any, result: any) => {
        connection.release();
        if (error) {
          return callback(error);
        }
        callback(null, result);
      }
      );
    } catch (error) {
      return callback(error);
    }

  });

};

export const updatePassword = async (email: any, role: any, password: any, callback: any) => {

  const password_hash = await bcrypt.hash(password, 10);

  const data: { email: string; password: string }[] = [
    { email: email, password: password_hash },
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err);
    }

    const updatePasswordGrocer = "call updatePassword_Grocer(?,?,@message_text);";
    const updatePasswordCompany = "call updatePasswordCompany(?,?,@message_text);";
    try {

      if (role == "grocer") {
        connection.query(updatePasswordGrocer, [email, password_hash], (error: any, result: any) => {
          connection.release();
          if (error) {
            return callback(error);
          }
          callback(null, result);
        }
        );

      } else {
        connection.query(updatePasswordCompany, [email, password_hash], (error: any, result: any) => {
          connection.release();
          if (error) {
            return callback(error);
          }
          callback(null, result);
        }
        );
      }
    } catch (error) {
      return callback(error);
    }
  });
};