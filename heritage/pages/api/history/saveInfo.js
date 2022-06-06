var fileS = null;
const logger = require('pino')()
import { validateService } from '../../../services/validate.service';
import apiHandler from '../handlers/apiHandler';
if (typeof window === 'undefined') {
    var fileS = require('fs');
}

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return saveTheInfo(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function saveTheInfo(req, res) {
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (fileS != null) {
        let dataMap = new Map(req.body);
        var dataCorrect = isDataCorrect(dataMap.get("locale"), dataMap.get("data"));
        if(!dataCorrect){
            logger.error("Error intentando guardar la historia de la EII, idioma incorrecto o datos vacíos.")
            res.status(404).json({ result: "error", message: localeCorrect.message })
        }
        fileS.writeFile('public/history/' + dataMap.get("locale") + '.html', dataMap.get("data"), 'utf8', (err, data) => {
            if (err) {
                logger.error("Error intentando actualizar la historia de la EII del idioma: " + dataMap.get("locale") + ".")
                logger.error(err.message)
                res.status(400).json({ result: "error", message: err })
            } else {
                logger.info("Se ha actualizado correctamente la historia de la EII del idioma: " + dataMap.get("locale") + ".")
                res.status(200).json({ result: "ok", message: data })
            }
        });
    }
}

export function isDataCorrect(locale, data){
    return validateService.checkIsValidlocale(locale) && !validateService.checkEmpty(data)
}