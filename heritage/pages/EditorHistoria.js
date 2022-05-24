import TextEditor from "../components/TextEditor/TextEditor"
import { useIntl } from "react-intl"

export default function EditorHistoria() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    return (<>
    <h1 className="title1">{f("EditorHistoriaTitulo")}</h1>
    <p>{f("EditorHistoriaTexto")}</p>
    <TextEditor />
    </>);

}
