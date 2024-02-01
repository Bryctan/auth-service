import bcrypt from 'bcrypt';

function comparePassword(password: string, storedPassword: string): boolean {

    if (bcrypt.compareSync(password, storedPassword)) {
        return true;
    } else {
        return false;
    }
}

export default comparePassword;

