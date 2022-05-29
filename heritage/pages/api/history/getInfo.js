var fileS = null;
import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';
const logger = require('pino')()
if (typeof window === 'undefined') {
    var fileS = require('fs');
}

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return getTheInfo(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}


async function getTheInfo(req, res) {
    if(!validateService.checkExistsBody(req.body)){
        res.status(404).json({result: "error", message: "Body not found"})
        return;
    }
        if(fileS != null){
            let dataMap = new Map(req.body);
            fileS.readFile('public/history/'+dataMap.get("locale")+'.html', 'utf8', (err, data) => {
                if (err) {
                    logger.error("Error intentando leer la historia de la EII del idioma: "+dataMap.get("locale")+".")
                    logger.error(err.message)
                    res.status(400).json({result: "error", message: err})
                }else{
                    logger.info("Se ha devuelto correctamente la historia de la EII del idioma: "+dataMap.get("locale")+".")
                res.status(200).json({result: "error", message: data})}
              });
    }
}