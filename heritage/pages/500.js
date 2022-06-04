import { useIntl } from "react-intl"
import Image from 'next/image'

export default function Custom500() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  return (<section className="Error">
    <h1>{f("Error500")}</h1>
    <div className="ImagenError">
      <Image
        src="/Error500.png"
        alt={f("ImagenError")}
        layout='responsive'
        width="0"
        height="0"
        objectFit="contain"
      />
    </div>
  </section>)
}