var fileS = null;
if (typeof window === 'undefined') {
    var fileS = require('fs');
}

export default async (req, res) => {
        if(fileS != null){
            let dataMap = new Map(req.body);
            fileS.readFile('public/history/'+dataMap.get("locale")+'.html', 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({result: "error", message: err})
                }else{
                res.status(200).json({result: "error", message: data})}
              });
    }
}