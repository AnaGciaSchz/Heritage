
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

        crypt.genSalt(parseInt(saltRounds), function(err, salt) {
            crypt.hash(dataMap.get("password"), salt, function(err, hash) {
                if(err) throw err;
                dataMap.set("passwordHash", hash);
                addNewAdmin(dataMap, hash)
            });
        });

    function addNewAdmin(dataMap, hash){
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
            if (err) {
                res.status(404).json({result: "error", message: err.message + " on registration operation"})
            }
            res.status(200).json({result: "ok", message: "Everything ok"})
            });
        }
    }

    }