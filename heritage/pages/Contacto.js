import { useIntl } from "react-intl"

export default function Contacto() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    return (<>
        <section className='contacto'>
            <h1>{f("Contacto")}</h1>
            <section>
                <h2>{f("DireccionContacto")}</h2>
                <p>{f("TextoContacto")}</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1450.532919353979!2d-5.85167!3d43.3547334!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd368ce0ccbc553d%3A0x6084f78d2a2d083c!2sEscuela%20de%20Ingenier%C3%ADa%20Inform%C3%A1tica!5e0!3m2!1ses!2ses!4v1654368063286!5m2!1ses!2ses" className='map' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                <section>
                    <h2 >{f("DatosContacto")}</h2>
                    <p><strong>{f("CorreoElectronico")}:</strong> eii@uniovi.es</p>
                    <p><strong>{f("Telefono")}:</strong> +34.985.10.27.96</p>
                </section>
                <section >
                    <h2 >{f("NumerosTelefonoYFax")}</h2>
                    <div className='telefonos'>
                        <section>
                            <h3 >{f("Administration")}</h3>
                            <p><strong>{f("Fax")}:</strong>+34.985.10.95.99</p>
                            <p><strong>{f("Telefono")}</strong>+34.985.10.32.90</p>
                        </section>
                        <section>
                            <h3 >{f("Conserjería")}</h3>
                            <p><strong>{f("Telefono")}:</strong> +34.985.10.27.96</p>
                        </section>
                        <section>
                            <h3 >{f("DireccionEII")}</h3>
                            <p><strong>{f("Telefono")}:</strong> +34.985.10.95.49</p>
                            <p><strong>{f("Fax")}: </strong> +34.985.10.95.51</p>
                        </section>
                        <section>
                            <h3 >{f("DEII")}</h3>
                            <p><strong>{f("CorreoElectronico")}: </strong> delegacion.eii@uniovi.es</p>
                            <p><strong>{f("Telefono")}: </strong>+34.985.10.28.94</p>
                        </section>
                    </div>
                    <section>
                        <h3 >{f("MasInfo")}</h3>
                        <p><a href="https://sies.uniovi.es/paginasblancas/web/<strongusqueda-anonima/personal.faces" target="_blank">{f("PaginasBlancas")}</a></p>
                    </section>
                </section>
            </section>

        </section>

    </>

    )
}