import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
export default function HomeCarousel() {
  const [slides, setslides] = useState([{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdutQfiy3GHw1bWOObaq6u-nIivB6Uzz1C6Fw43FvKhQ8NAMqiKst4_aRrJi6ZZAUQq8&usqp=CAU" }])

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
    const req = await fetch('http://https://psa-server-placement-system-application.vercel.app/user/carousel', {
      method: "GET",
      mode: "cors",
    })
    const { data } = await req.json()
    if(data.length!=0){
      data.map((e,i)=>{
        if(i!=0){
          setslides([...slides,{img:`http://https://psa-server-placement-system-application.vercel.app/myclub/carousel/${e.img}`,cid:e.cid}])
        }else{
          setslides([{img:`http://https://psa-server-placement-system-application.vercel.app/myclub/carousel/${e.img}`,cid:e.cid}])
        }
    })
    }else{
      
    }
  }
  useEffect(() => {
    getCarousel()
  }, [])


  return (<div className='h-[480px] pt-10'>
    <div
      style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
      className='w-full h-full bg-center bg-cover duration-500'
    ></div>
    <div className='group-hover:block absolute top-[50%] mx-1 -my-10  -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactLeft onClick={prevSlide} size={30} className="z-1" />
    </div>
    <div className='group-hover:block absolute top-[50%]  mx-1 -my-10 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactRight onClick={nextSlide} size={30} className="z-1" />
    </div>
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
  </div>
  )
}


