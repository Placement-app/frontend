// import { useContext, useEffect, useState } from "react";
// import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import { RxDotFilled } from 'react-icons/rx';
// import { UserContext } from '../../../Context/UserContext'

// export default function HomeCarousel() {
//   const { Carousels } = useContext(UserContext)

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? Carousels.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };
//   const nextSlide = () => {
//     const isLastSlide = currentIndex === Carousels.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };
//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex);
//   };


//   return (


//     Carousels.length > 0 ?
//         <div
//           style={{ width:"100vw",height:"50vh",backgroundImage: `url(http://192.168.1.35:5000/myclub/carousel/${Carousels[currentIndex].img})` }}
//           className='rounded shadow-md bg-center bg-cover duration-500'
//         >
//         <div className='flex top-4 justify-center py-2'>
//           {Carousels.map((slide, slideIndex) => (
//             <div
//               key={slideIndex}
//               onClick={() => goToSlide(slideIndex)}
//               className='text-2xl cursor-pointer'
//             >
//               <RxDotFilled />
//             </div>
//           ))}
//         </div>
//         <div className='group-hover:block absolute top-[1000px] mx-1  -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
//           <BsChevronCompactLeft onClick={prevSlide} size={30} className="z-1" />
//         </div>
//         <div className='group-hover:block absolute top-[1000px]  mx-1 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
//           <BsChevronCompactRight onClick={nextSlide} size={30} className="z-1" />
//         </div>
//       </div> : ""

//   )
// }


import { useContext, useState } from "react";
import { UserContext } from '../../../Context/UserContext'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export default function HomeCarousel() {
  const { Carousels } = useContext(UserContext)

  return (

    <Carousel autoPlay={true} showThumbs={false} interval={2500} infiniteLoop showStatus={false}>
      {Carousels.length > 0 ?
        Carousels.map((e, i) => {
          return (
            <img key={i} src={`http://192.168.1.35:5000/myclub/carousel/${e.img}`} alt="" />
          )
        })
        : <div></div>}

    </Carousel>

  )
}


