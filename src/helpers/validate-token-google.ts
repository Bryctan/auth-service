import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();


export const validateTokenGoogle = async (token: string) => {

    const clientId = process.env.CLIENT_ID;
    const client = new OAuth2Client(clientId);

    try {
        const verify = await client.verifyIdToken(
            {
                idToken: token,
                audience: clientId
            }
        );
        const user = verify.getPayload();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    };
};
