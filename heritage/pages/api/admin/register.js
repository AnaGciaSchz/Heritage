
var fileS = null;
var crypt = null;
import apiHandler from "../handlers/apiHandler";
const logger = require('pino')()
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
}
import { validateService } from "../../../services/validate.service";

const saltRounds = process.env['SALT_ROUNDS'];
var admins = require('/data/admin.json');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function registerUser(req, res) {
    if(!validateService.checkExistsBody(req.body)){
        res.status(404).json({result: "error", message: "Body not found"})
        return;
    }
    if(fileS != null && crypt != null){

        var dataMap = new Map(req.body);

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
            logger.warn('Intento de registro fallido: No hay username.')
            res.status(400).json({result: "error", message: "EscribeUsername"})
            return true;
        }

        if(repeatedUsername){
            logger.warn('Intento de registro fallido: Nombre de usuario en uso: '+dataMap.get("username"))
            res.status(400).json({result: "error", message: "NombreDeUsuarioEnUso"})
            return true;
        }

        if(nameChecks){
            logger.warn('Intento de registro fallido: No se ha especificado nombre del admin.')
            res.status(400).json({result: "error", message: "EscribeNombre"})
            return true;
        }
        
        if(passwordCheck){
            logger.warn('Intento de registro fallido: No se ha especificado contrasena.')
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
            logger.info('El usuario '+newAdmin.username + ' acaba de ser registrado.')
            res.status(200).json({result: "ok", message: "Everything ok"})
        }