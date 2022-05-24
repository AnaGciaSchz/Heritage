import TextDisplay from "components/TextDisplay/TextDisplay.js"
import { useIntl } from "react-intl"

export default function HistoriaEII() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })

  return (
    <div>
      <h1 className="title1">{f("historiaEII")}</h1>
      <TextDisplay />
    </div>
  )

}
