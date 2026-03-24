import SecondCarousel from '../../components/Carousal/SecondCarousal';
import { booksdata } from '@/json/bookdata';
import ThirdCarousal from '../../components/Carousal/ThirdCarousel';
import { dummySlides } from '@/json/thoughtsdata';
const Books = () => {


  return (
    <section id='books' className="w-full flex flex-col justify-center items-center  ">
     
        <SecondCarousel data={booksdata}  /> 
        <ThirdCarousal  data={dummySlides} />   
    </section>
  
  );
};

export default Books;

