/**
 * // Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
*/

var fileS = null;
var crypt = null;
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
}

import { validateService } from "../../../services/validate.service";

var admins = require('/data/admin.json');

export default async (req, res) => {
        if(fileS != null && crypt != null){
            var dataMap = new Map(JSON.parse(req.body));

            var i = 0;
            for(i;i<admins.length;i++){
                console.log(admins[i].username)
                if(admins[i].username == dataMap.get("username")){
                    crypt.compare(dataMap.get("password"), admins[i].password, function(err, result) {
                        isPasswordCorrect(result, res)
                        found = true;
                })
            }
        }
    }
}

function isPasswordCorrect(result, res){
    if(result){
        res.status(200).json({result: "error", message: "LoginCorrecto"})
    }
    else{
        res.status(400).json({result: "error", message: "ContrasenaNoCorrecta"})
    }

}