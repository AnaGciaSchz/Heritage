import TextEditor from "../components/TextEditor/TextEditor"

export default function EditorHistoria() {
    return (<>
    <h1 className="title1">Editor de la historia de la EII</h1>
    <p>Para editar un idioma concreto, cambia el idioma de la página con el selector de arriba. Cuidado al publicar fotografías, se recomienda hacer un borrador aparte y utilizar
        esta caja sólo para pegar el nuevo contenido y publicarlo.
    </p>
    <TextEditor />
    </>);

}
