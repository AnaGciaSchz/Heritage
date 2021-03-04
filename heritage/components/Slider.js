import 'logic/slider.js'

function Slider(props){
    return(
           <div className="container-slider" >
               <div className="slider" id= "slider">
                    <div className="slider-section">
                        <img src = "/slider/1.png" className="slider-img"></img>
                    </div>
                    <div className="slider-section">
                        <img src = "/slider/2.png" className="slider-img"></img>
                    </div>
                    <div className="slider-section">
                        <img src = "/slider/3.png" className="slider-img"></img>
                    </div>
                    <div className="slider-section">
                        <img src = "/slider/4.png" className="slider-img"></img>
                    </div>
               </div>
               <div className="slider-btn__right" id="btn-right">&#62;</div>
               <div className="slider-btn__left" id= "btn-left">&#60;</div>
               <script src= "slider.js"></script>
           </div>
    )
}

export default Slider;