import styles from './loading.module.scss'
import { useIntl } from "react-intl"
import getConfig from 'next/config';

export default function Loading() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    const { publicRuntimeConfig } = getConfig();
    const resourceUrl = `${publicRuntimeConfig.resourceUrl}`;

    return (
        <img className={styles.loadingIcon} src={resourceUrl+"/loading.gif"} alt= {f("LoadingGif")} title={f("LoadingGif")} />
    )
}