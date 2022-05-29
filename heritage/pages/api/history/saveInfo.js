var fileS = null;
const logger = require('pino')()
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

async function saveTheInfo (req, res) {
        if(fileS != null){
            let dataMap = new Map(req.body);
            fileS.writeFile('public/history/'+dataMap.get("locale")+'.html',dataMap.get("data"), 'utf8', (err, data) => {
                if (err) {
                    logger.error("Error intentando actualizar la historia de la EII del idioma: "+dataMap.get("locale")+".")
                    logger.error(err.message)
                    res.status(400).json({result: "error", message: err})
                }else{
                    logger.info("Se ha actualizado correctamente la historia de la EII del idioma: "+dataMap.get("locale")+".")
                res.status(200).json({result: "ok", message: data})}
              });
    }
}