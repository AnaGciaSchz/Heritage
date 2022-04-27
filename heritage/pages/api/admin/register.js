
var fileS = null;
var crypt = null;
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
}
let admins = require('data/admin.json');
const saltRounds = process.env['SALT_ROUNDS'];

export default async (req, res) => {
    if(fileS != null && crypt != null){
        let dataMap = new Map(JSON.parse(req.body));
        id = admins.length ? Math.max(...admins.map(x => x.id)) + 1 : 1;

        dateCreated = new Date().toISOString();
        dateUpdated = new Date().toISOString();

        crypt.hash(password, saltRounds, function(err, hash) {
            dataMap.set("passwordHash", hash);
        });

        const content = ',\n{\n\t"username" : "'+dataMap.get("username")
        +'",\n\t"password": "'+dataMap.get("passwordHash")
        +'",\n\t"name": "'+dataMap.get("name")
        +'"\n}';

        console.log(content);

        fileS.appendFile('/data/admin.json', content, err => {
            if (err) {
                res.status(404).json({result: "error", message: err.message + " on registration operation"})
            }
            res.status(200).json({result: "ok", message: "Everything ok"})
            });
        }
    }