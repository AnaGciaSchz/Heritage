import styles from './loading.module.scss'
import { useIntl } from "react-intl"

export default function Loading() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    return (
        <img className={styles.loadingIcon} src="/loading.gif" alt= {f("LoadingGif")} title={f("LoadingGif")} />
    )
}