
var fileS = null;
var crypt = null;
import apiHandler from "../handlers/apiHandler";
const logger = require('pino')()
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
}
import { validateService } from "../../../services/validate.service";

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
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (fileS != null && crypt != null) {

        const saltRounds = process.env['SALT_ROUNDS'];
        var admins = require('/data/admin.json');

        var dataMap = new Map(req.body);

        var isCorrect = checkInformation(admins, dataMap, res);

        if (isCorrect.result == "error"){
            res.status(400).json({message: isCorrect.message })
        }

        crypt.genSalt(parseInt(saltRounds), function (err, salt) {
            crypt.hash(dataMap.get("password"), salt, function (err, hash) {
                if (err) throw err;
                dataMap.set("passwordHash", hash);
                addNewAdmin(dataMap, hash, res)
            });
        });
    }

}

export function checkInformation(admins, dataMap) {
    var usernameLength = validateService.checkLength(dataMap.get("username"), 20)
    var repeatedUsername = validateService.checkRepeatedUsername(admins, dataMap.get("username"));
    var nameChecks = validateService.checkLength(dataMap.get("name"), 35);
    var passwordCheck = !validateService.checkSecurePassword(dataMap.get("password"));
    var passwordsAreTheSame = validateService.checkValidPasswords(dataMap.get("password"), dataMap.get("repeatPassword"))

    if (!usernameLength) {
        logger.warn('Intento de registro fallido: No hay username.')
        return { result: "error", message: "EscribeUsername" }
    }

    if (repeatedUsername) {
        logger.warn('Intento de registro fallido: Nombre de usuario en uso: ' + dataMap.get("username"))
        return { result: "error", message: "NombreDeUsuarioEnUso" }
    }

    if (!nameChecks) {
        logger.warn('Intento de registro fallido: No se ha especificado nombre del admin.')
        return { result: "error", message: "EscribeNombre" }
    }

    if (passwordCheck || !passwordsAreTheSame) {
        logger.warn('Intento de registro fallido: No se ha especificado contrasena o es insegura.')
        return { result: "error", message: "EscribeContrasena" }
    }
}

function addNewAdmin(dataMap, hash, res) {
    var adminId = admins.length + 1;
    var date = new Date();
    var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "Z"
    var dateUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "Z"


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
        if (err) throw err;
    });
    logger.info('El usuario ' + newAdmin.username + ' acaba de ser registrado.')
    res.status(200).json({ result: "ok", message: "Everything ok" })
}