import Image from 'next/image'
import Link from 'next/link'

function ImageWithLink(props){
    return(

        <Link href={props.referencia}>
      <a>
          <Image
          className={props.clase}
            src={props.img}
            alt={props.alt}
            width="150"
            height="74"
          />
    </a>
  </Link>
    )
}
export default ImageWithLink;