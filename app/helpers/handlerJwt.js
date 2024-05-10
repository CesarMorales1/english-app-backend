import jwt from "jsonwebtoken";

const creatingTokenJwt = (userId,userEmail,) =>
{
    const userInformation = {id: userId,email: userEmail };
    return jwt.sign(userInformation,process.env.SECRET,{});
}

const validatingTokenHeader = (req, res, next) => {
    const authorization = req.get('Authorization');
    try {
        const tokenToVerify = validateHeaderAuth(authorization);
        vaildateTokenSign(tokenToVerify,res);
        //devolver un succes true para continuar con la peticion
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized please log in again' });
        res.end();
    }
}

const validateHeaderAuth = (httpAuthorization) => {
    if (httpAuthorization && httpAuthorization.toLowerCase().startsWith('bearer')) {
        return httpAuthorization.split(' ')[1];
    }
    throw new Error('Token not provided');
}

const vaildateTokenSign = (tokenToVerify) => {
    const tokenDecodified = jwt.verify(tokenToVerify, process.env.SECRET);
    if (!tokenDecodified || !tokenDecodified.id) {
        throw new Error('Token not provided');
    }
}


export {creatingTokenJwt,validatingTokenHeader}
