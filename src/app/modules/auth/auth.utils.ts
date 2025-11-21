import jwt from 'jsonwebtoken';


export const createToken = (
    jwtpayload: {
        userId: string;
        role: string;
    },
    secret: string,
    expiresIn: string
) => {
    const token = jwt.sign(jwtpayload, secret, { expiresIn });
    return token;
};
