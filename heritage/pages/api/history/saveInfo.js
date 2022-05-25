var fileS = null;
const logger = require('pino')()
if (typeof window === 'undefined') {
    var fileS = require('fs');
}

export default async (req, res) => {
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