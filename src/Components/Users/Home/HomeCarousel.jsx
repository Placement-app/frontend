import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
export default function HomeCarousel() {
  const [slides, setslides] = useState([])
  // { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdutQfiy3GHw1bWOObaq6u-nIivB6Uzz1C6Fw43FvKhQ8NAMqiKst4_aRrJi6ZZAUQq8&usqp=CAU" }
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const getCarousel = async () => {
    const req = await fetch('http://localhost:5000/user/carousel', {
      method: "GET",
      mode: "cors",
    })
    const { data } = await req.json()
    if (data.length != 0) {
      setslides(data)
    }
  }
  useEffect(() => {
    getCarousel()
    console.log(slides);
  }, [])

  return (


    slides.length > 0 ?
      <div className='h-[480px]'>
        <div
          style={{ backgroundImage: `url(http://localhost:5000/myclub/carousel/${slides[currentIndex].img})` }}
          className='w-full h-full bg-center bg-cover duration-500'
        ></div>
        <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer'
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
        <div className='group-hover:block absolute top-[35%] mx-1  -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} className="z-1" />
        </div>
        <div className='group-hover:block absolute top-[35%]  mx-1 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} className="z-1" />
        </div>
      </div> : ""

  )
}


