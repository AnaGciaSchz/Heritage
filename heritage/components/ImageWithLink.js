import Image from 'next/image'
import Link from 'next/link'

function ImageWithLink(props){
    return(
      <Link href={props.referencia}>
          <Image
            src={props.img}
            alt={props.alt}
            width="150"
            height="74"
          />
      </Link>
    )
}
export default ImageWithLink;