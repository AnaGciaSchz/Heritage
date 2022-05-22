import SearchCard from "../components/SearchComponents/SearchCard/SearchCard";

export default function About() {
    return (<>
    <h1 className="title1">Sobre Heritage</h1>
    <br></br>
    <br></br>
   <h2 className="title2">¿Qué es Heritage?</h2>
   <div className= "flexAbout">
   <p >Heritage es una página web creada como Trabajo Fin de Grado por la estudiante Ana María García Sánchez en 2022 que cursaba 
    el Grado en Ingeniería Informática del Software de la Universidad de Oviedo, impartido en la Escuela de Ingeniería Informática.
    <br></br><br></br>
    El Objetivo de esta página es divulgar la historia de la EII, que consta de momentos muy interesantes para la informática en
   Asturias, y mostrar qué tan lejos han llegado en sus carreras profesionales algunos de los egresados. También se ha dejado espacio
   a un par de secciones especiales, una para hablar de nuestros profesores (pasados y presentes) y otra para nuestros representantes de 
   estudiantes.</p>
   <div className= "specialCard">
   <SearchCard  key = "0"
            id= "0"
            index = "SpecialCard"
            name= "Ana María García Sánchez"
            img="/AnaGs.jpg"
            firtsLine="2022-2023"
            text="Estudiante de la EII y autora de este TFG"
            date="13/05/2022"
            description="Ana es una estudiante del Grado de Ingeniería Informática del Software que espera entregar este TFG en 2022 y conseguir así su título."
            been="Dentro de sus logros podemos encontrar el atreverse a diseñar Heritage desde 0, intentar que la página sea responsive o escribir esta carta especial con información de ella. "
            red1="LinkedIn"
            red1Link="https://www.linkedin.com/in/anagciaschz/"
            red2="GitHub"
            red2Link="https://github.com/AnaGciaSchz"
            star="true"
        />
        </div>
        </div>
        <h2 className="title2">¿Por qué Heritage?</h2>
        <p className= "textAbout">Heritage significa "Patrimonio" en inglés, y eso es lo que esta página web quiere reflejar, el patrimonio de nuestra escuela. Hay muchas formas de reflejar esta
            idea, pero aparte de ser una palabra que refleja de forma algo cariñosa la idea principal de este trabajo, también nos permite hacer un juego de palabras y 
            meter las sigras de nuesrra escuela ("EII") en el propio logo. Este es el nombre original que el tutor de este TFG, Jose Manuel Redondo, le dio al proyecto, y era 
            tan apropiado que se dejó como el definitivo.</p>
        <h2 className="title2">¿Por qué un oso?</h2>
        <p className= "textAbout">El oso que forma parte del logo de Heritage es Petra. Es la mascota oficial de la EII desde 2021 y de vez en cuando es usada por la Delegación de
        Estudiantes EII en documentos y publicaciones en redes. La razón de que también haya sido elegida como logo de Heritage es que, aparte de ser un buen recurso para representar
        a la Escuela, Tanto el tutor de este TFG como la autora estuvieron incluídos en la creación de la mascota, así que se aprovechó la oportunidad de incluirla en más recursos de la EII.</p>
        <h2 className="title2">¿Es esta la versión definitiva de Heritage?</h2>
        <p>Esta es sólo la primera versión de la página web. Hay aún diseños y funcionalidades que se tienen en mente peor no se han implementado aún, por lo que es posible que en el futuro
            otro TFG de otra autora (o autor) lo amplíe y añada más funcionalidades.
        </p>
        <h2 className="title2">¿Cómo puedo solicitar aparecer en esta página?</h2>
        <p>Si eres una egresada o egresado, un profesor o antigua/o representante de estudiantes y deseas aparecer en Heritage, ...
        </p>

    </>

    );
}