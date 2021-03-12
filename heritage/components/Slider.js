//import 'logic/slider.js'
import React from 'react'
import styles from './slider.module.scss'

class Slider extends React.Component {
    constructor(props)  {
        super(props)

        this.currentSlide = 0;
        this.slides = [
            { id: 1, image: '/slider/1.png' },
            { id: 2, image: '/slider/2.png' },
            { id: 3, image: '/slider/3.png' },
            { id: 4, image: '/slider/4.png' },
        ].map(slide => ({...slide, ref: React.createRef()}))

        this.scheduleNext()
    }

    scheduleNext() {
        setTimeout(() => {
            this.goNext();
            this.scheduleNext()
         }, 5000);
    }

    goNext() {
        this.currentSlide++
        this.updateSlide()
    }

    updateSlide() {
        this.currentSlide = this.currentSlide % this.slides.length
        const slide = this.slides[this.currentSlide].ref.current
        if (slide) {
            slide.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }

    render() {
        return(
            <div className={styles['container-slider']}>
                <button className={[styles.sliderBtn, styles.sliderBtn_right].join(' ')} onClick={() => this.goNext()}>&#62;</button>
                <button className={styles.sliderBtn} onClick={() => this.goNext()}>&#60;</button>
                <div className={styles.slider} id= "slider">
                    { this.slides.map(slide => (
                        <div ref={slide.ref} key={slide.id} className={styles['slider-section']}>
                                <img src = {slide.image} className="slider-img" />
                            </div>
                        ))}
                </div>
            </div>
        )

    }
}

export default Slider;