import { useCountries } from '../../../context/CountriesContext';
import { formatPopulation, reduceNameLength } from '../../../helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function Slider({ neighbours }) {
  const { fetchCountry } = useCountries();

  return (
    <Swiper
      className=" neighbours"
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={15}
      slidesPerView={3}
    >
      {neighbours.map((neighbour, i) => (
        <SwiperSlide
          onClick={() => fetchCountry(neighbour.commonName)}
          key={i}
          className="neighbour"
        >
          <img src={neighbour.flag} alt={neighbour.commonName} />
          <div className="neighbour__data">
            <h3 className="neighbour__name">
              {reduceNameLength(neighbour.commonName)}
            </h3>
            <h4 className="neighbour__region">{neighbour.continent}</h4>
            <p className="neighbour__row">
              <span>🏛️</span>
              {neighbour.capitalCity}
            </p>
            <p className="neighbour__row">
              <span>👫</span>
              {formatPopulation(neighbour.population)}
            </p>
            <p className="neighbour__row">
              <span>🗣️</span>
              {Object.values(neighbour.language).at(0)}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
