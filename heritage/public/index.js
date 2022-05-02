import media1 from "./slider/1.png";
import media2 from "./slider/2.png";
import media3 from "./slider/3.png";
import media4 from "./slider/4.png";

export const media = [media1, media2, media3, media4];
export const mediaByIndex = index => media[index % media.length];
