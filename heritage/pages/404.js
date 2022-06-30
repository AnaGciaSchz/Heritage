import { useIntl } from "react-intl"
import Image from 'next/image'
import getConfig from 'next/config';

export default function Custom404() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  const { publicRuntimeConfig } = getConfig();
    const resourceUrl = `${publicRuntimeConfig.resourceUrl}`;
  return (<section className="Error">
    <h1>{f("Error404")}</h1>
    <div className="ImagenError">
      <Image
        src={resourceUrl+"/Error404.png"}
        alt={f("ImagenError")}
        layout='responsive'
        width="0"
        height="0"
        objectFit="contain"
      />
    </div>
  </section>)
}