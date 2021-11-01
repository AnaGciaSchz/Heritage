import TextEditor from "components/TextEditor/TextEditor.js"
import TextDisplay from "components/TextDisplay/TextDisplay.js"
import  clientPromise from "../lib/mongodb.js"


export default function HistoriaEII({dbs}) {
  return (
    <div>
            <h1 className="title1">Historia de la EII</h1>
      <TextDisplay/>
      <TextEditor/>
      {dbs}
    </div>
  )

}

export async function getServerSideProps(context) {
  const client = await clientPromise

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  let databasesList =await client.db("Heritage").admin().listDatabases();
  const dbs = [];
    let cont = 0;

    databasesList.databases.forEach(db => {
      dbs[cont] = db.name;
        cont++;
    });

    console.log(dbs)

  return {
    props:{
      dbs: JSON.parse(JSON.stringify(dbs))
    } 
  }
}
