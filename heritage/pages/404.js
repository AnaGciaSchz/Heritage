import { useIntl } from "react-intl"
import Image from 'next/image'

export default function Custom500() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    return (<div className= "Error">
    <h1 className="title1">{f("Error404")}</h1>
    <div className="ImagenError">
    <Image
      src="/Error404.png"
      alt={f("ImagenError")}
      layout='responsive'
      width="0"
      height="0"
      objectFit="contain"
    />
    </div>
    </div>)
  }