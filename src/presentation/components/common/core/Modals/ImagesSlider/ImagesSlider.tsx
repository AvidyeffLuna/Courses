import { IMedia } from "domain/core/entities/mediaEntity";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";

import "swiper/css";
import "swiper/css/scrollbar";

interface IImagesSliderProps {
  mediaSelected: IMedia;
  setMediaSelected: Dispatch<SetStateAction<IMedia>>;
  mediaList: IMedia[];
}

export default function ImagesSlider({
  mediaSelected,
  setMediaSelected,
  mediaList,
}: IImagesSliderProps) {
  return (
    <div className="px-4">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        spaceBetween={30}
        breakpoints={{
          0: {
            spaceBetween: 50,
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {mediaList.map((media: IMedia) => (
          <SwiperSlide key={media.url}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "150px",
                opacity: mediaSelected.url === media.url ? "100%" : "40%",
              }}
            >
              <Button
                variant=""
                onClick={() => setMediaSelected(media)}
                className="px-0 py-0"
              >
                <Image
                  src={media.url}
                  alt="media-picture-option"
                  layout="fill"
                  objectFit="cover"
                />
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
