import ImageWithLink from '../components/ImageWithLink/ImageWithLink'
import { useIntl } from "react-intl"

export default function Contacto() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })

    return (<>
    <h1 className='contactTitle'>{f("Contacto")}</h1>
    <h2 className='contactTitle2'>{f("Direccion")}</h2>
    <p className="pTry">{f("TextoContacto")}</p>
    <div className= "direccion">
    <span className='map'>
    <ImageWithLink
        alt="Alt"
        referencia="https://www.google.com/maps/dir/43.3543101,-5.8556381/43.355012,-5.851341/@43.3547334,-5.85167,18.54z"
        img="/EIIMapa.png" />
        </span>
        <span className="localization">
            <h3 className="title3">{f("Localizacion")}</h3>
            <p>{f("LocalizacionPrimeraLinea")}</p>
            <p>{f("LocalizacionSegundaLinea")}</p>
            <span className= "EII_Image">
            <ImageWithLink 
            alt="Alt"
            referencia="https://ingenieriainformatica.uniovi.es/"
            img="/EII.jpg" />
            </span>
        </span>

        </div>
        <div className= 'directionBlock'>
        <h2 className='contactTitle2'>{f("DatosContacto")}</h2>
        <p><b>{f("CorreoElectronico")}:</b> eii@uniovi.es</p>
        <p><b>{f("Telefono")}:</b> +34.985.10.27.96</p>
        </div>

        <h2 className='contactTitle2'>{f("NumerosTelefonoYFax")}</h2>
        <h3 className="title3">{f("Administration")}</h3>
        <p><b>{f("Fax")}:</b>+34.985.10.95.99</p>
        <h4 className= "title4">{f("AdministradorCentro")} </h4><p><b>{f("Telefono")}</b>+34.985.10.32.90</p>
        <h4 className= "title4">{f("UnidadAdministrativa")} </h4><p><b>{f("Telefonos")}: </b>+34.985.10.95.57 {f("y")} +34.985.10.95.49</p>
        <h3 className="title3">{f("Conserjería")}</h3>
        <p><b>{f("Telefono")}:</b> +34.985.10.27.96</p>
        <h3 className="title3">{f("DireccionEII")}</h3>
        <p><b>{f("Telefono")}:</b> +34.985.10.95.49</p>
        <p><b>{f("Fax")}: </b> +34.985.10.95.51</p>
        <h3 className="title3">{f("DEII")}</h3>
        <p><b>{f("CorreoElectronico")}: </b> delegacion.eii@uniovi.es</p>
        <p><b>{f("Telefono")}: </b>+34.985.10.28.94</p>
        <h3 className="title3">{f("MasInfo")}</h3>
        <br></br>
        <a href="https://sies.uniovi.es/paginasblancas/web/busqueda-anonima/personal.faces" >{f("PaginasBlancas")}</a> 
        </>

    )}