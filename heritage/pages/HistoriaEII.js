import TextEditor from "components/TextEditor/TextEditor.js"
import TextDisplay from "components/TextDisplay/TextDisplay.js"
import createStudentIndex from "./api/studentCard/create.js";

export default function HistoriaEII({ dbs }) {
  //const Test = async (id) => { const res = await fetch('http://localhost:3000/api/test/' + id); return await res.json() }
  //const onclick = () => {fetch('http://localhost:3000/api/studentCard/create');}
  return (
    <div>
      <h1 className="title1">Historia de la EII</h1>
      <TextDisplay />
      <TextEditor />
    </div>
  )

}

/*
export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/test')
  const dbs = await res.json()
  return {
    props: {
      dbs: dbs
    }
  }
}
*/
