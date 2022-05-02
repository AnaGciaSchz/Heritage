
var fileS = null;
var crypt = null;
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
}

import { validateService } from "../../../services/validate.service";

const saltRounds = process.env['SALT_ROUNDS'];
var admins = require('/data/admin.json');

export default async (req, res) => {
    if(fileS != null && crypt != null){

        var dataMap = new Map(JSON.parse(req.body));

        if(checkInformation(admins, dataMap, res)) return;

        crypt.genSalt(parseInt(saltRounds), function(err, salt) {
            crypt.hash(dataMap.get("password"), salt, function(err, hash) {
                if(err) throw err;
                dataMap.set("passwordHash", hash);
                addNewAdmin(dataMap, hash, res)
            });
        });
    }

    }

    function checkInformation (admins, dataMap, res){
        var usernameLength = !validateService.checkLength(dataMap.get("username"), 20) && !validateService.checkEmpty(dataMap.get("username"))
        var repeatedUsername = validateService.checkRepeatedUsername(admins,dataMap.get("username"));
        var nameChecks = !validateService.checkLength(dataMap.get("name"), 35) && !validateService.checkEmpty(dataMap.get("name"));
        var passwordCheck = !validateService.checkSecurePassword(dataMap.get("password"));

        if(usernameLength){
            res.status(400).json({result: "error", message: "EscribeUsername"})
            return true;
        }

        if(repeatedUsername){
            res.status(400).json({result: "error", message: "NombreDeUsuarioEnUso"})
            return true;
        }

        if(nameChecks){
            res.status(400).json({result: "error", message: "EscribeNombre"})
            return true;
        }
        
        if(passwordCheck){
            res.status(400).json({result: "error", message: "EscribeContrasena"})
            return true;
        }
    }

    function addNewAdmin(dataMap, hash, res){
        var adminId = admins.length+1;
        var date = new Date();
        var dateCreated = date.getFullYear()+ "-" +(date.getMonth() + 1)+ "-" +date.getDate() + "T" + date.getHours()+ ":" + date.getMinutes()+ ":" + date.getSeconds()+ "Z"
        var dateUpdated = date.getFullYear()+ "-" +(date.getMonth() + 1)+ "-" +date.getDate() + "T" + date.getHours()+ ":" + date.getMinutes()+ ":" + date.getSeconds()+ "Z"


        let newAdmin = { 
            id: adminId,
            username: dataMap.get("username"),
            name: dataMap.get("name"),
            password: hash,
            created: dateCreated,
            updated: dateUpdated 
        };
        admins.push(newAdmin)

        var writeAdmins = JSON.stringify(admins, null, 2);

        fileS.writeFileSync('data/admin.json', writeAdmins, err => {
            if(err) throw err;
            });
            res.status(200).json({result: "ok", message: "Everything ok"})
        }