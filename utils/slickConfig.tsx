import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const slickConfig = {
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],

};