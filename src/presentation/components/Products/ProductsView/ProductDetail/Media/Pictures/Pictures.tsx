import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

export default function Pictures() {
  const [pictures] = useState([
    "https://i.pinimg.com/564x/99/a9/fc/99a9fce245dbeb1c8808bc3d4a32c5c6.jpg",
    "https://i.pinimg.com/564x/dc/fe/ba/dcfeba49fb8d10319eb247e0c22435e5.jpg",
    "https://i.pinimg.com/564x/3d/a2/6f/3da26f90e33befda42aefc443ad7b338.jpg",
  ]);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={3}
      spaceBetween={30}
    >
      {pictures.map((picture) => (
        <SwiperSlide key={picture}>
          <div
            style={{
              position: "relative",
              width: "150px",
              height: "150px",
              overflow: "hidden",
              borderRadius: "4px",
              opacity: "70%",
            }}
          >
            <Image
              src={picture}
              alt="Product picture additional"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
