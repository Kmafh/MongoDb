const { response } = require("express");
const  jwt  = require("jsonwebtoken");

const validJWT = async(req,res = response, next ) =>{

    //Leer el token de los Headers
    const token =  req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg:'No ampara token'
        })
    }

    try{

        const { id } = jwt.verify( token, process.env.JWT_SECRET);

        req.id = id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg:'Token no válido'
        })
    }

    res.status(200).json({
        ok: true,
        token
    })

}

module.exports = {
    validJWT
}