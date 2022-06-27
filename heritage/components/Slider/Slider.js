import React, { useState, useEffect, useCallback } from 'react'
import { PrevButton, NextButton } from "./SliderButtons";
import useEmblaCarousel from 'embla-carousel-react'
import styles from './slider.module.scss'
import { useIntl } from "react-intl"

export default function Slider() {
  const [viewportRef, embla] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const slides = [
    '/slider/1.png',
    '/slider/2.png',
    '/slider/3.png',
    '/slider/4.png']

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);


  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={viewportRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__inner}>
                <img
                  className={styles.embla__slide__img}
                  src={index}
                  alt={f("PromocionHeritage")+index.split("/")[2].split(".")[0]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  )
}