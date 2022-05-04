var fileS = null;
var crypt = null;
var jwt = null;
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
    jwt = require('jsonwebtoken');
}


var admins = require('/data/admin.json');

export default async (req, res) => {
        if(fileS != null && crypt != null){
            var dataMap = new Map(req.body);
            var i = 0;
            for(i;i<admins.length;i++){
                if(admins[i].username == dataMap.get("username")){
                    var password = admins[i].password;
                    crypt.compare(dataMap.get("password"), password, function(err, result) {
                        if (err) { throw (err); }
                        isPasswordCorrect(admins[i],result, res)
                })
                return;
            }
        }
    }
}

function isPasswordCorrect(user,result, res){
    if(result){
        const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
        res.status(200).json({result: "error", message: "LoginCorrecto", id: user.id, username: user.username, name: user.name, token})
    }
    else{
        res.status(400).json({result: "error", message: "ContrasenaNoCorrecta"})
    }

}