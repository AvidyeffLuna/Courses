import { IMedia } from "domain/core/entities/mediaEntity";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import * as Styles from "./MainImageStyles";
import NextArrow from "./NextArrow/NextArrow";
import PreviousArrow from "./PreviousArrow/PreviousArrow";

interface IMainImageProps {
  media: IMedia;
  mediaList: IMedia[];
  setMediaSelected: Dispatch<SetStateAction<IMedia>>;
}

export default function MainImage({
  media,
  mediaList,
  setMediaSelected,
}: IMainImageProps) {
  return (
    <Styles.MainImageWrapper>
      <Styles.MainImagePreviousArrow>
        <PreviousArrow
          media={media}
          mediaList={mediaList}
          setMediaSelected={setMediaSelected}
        />
      </Styles.MainImagePreviousArrow>

      <Styles.MainImageContent>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={media.url}
            alt="media-main"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Styles.MainImageContent>

      <Styles.MainImageNextArrow>
        <NextArrow
          media={media}
          mediaList={mediaList}
          setMediaSelected={setMediaSelected}
        />
      </Styles.MainImageNextArrow>

      <Styles.MainImageCoverBlur imageurl={media.url} />
    </Styles.MainImageWrapper>
  );
}
