import ImageWithLink from '../ImageWithLink/ImageWithLink';
import styles from './notice.module.scss'

export default function Notice(props) {
    return (
        <div className={styles.notice}>
            <ImageWithLink className={styles.image}
                referencia={props.referencia}
                img={props.img}
                alt={props.alt}
            />
            <p className={styles.text}>{props.text}</p>
        </div>
    )

}