import Image from "next/image";
import Link from "next/link";
import { ProductsRoutesEnum } from "presentation/routes/productsRoutes";

interface IProductImageProps {
  pictureUrl: string;
  productId: string;
  productName: string;
}

export default function ProductImage({
  pictureUrl,
  productId,
  productName,
}: IProductImageProps) {
  return (
    <Link
      href={{
        pathname: ProductsRoutesEnum.ProductsView,
        query: {
          productName: encodeURIComponent(productName.toLowerCase()).replace(
            /%20/g,
            "-"
          ),
          productId: productId,
        },
      }}
    >
      <a>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "250px",
            overflow: "hidden",
            borderRadius: "4px",
          }}
        >
          <Image
            src={pictureUrl}
            alt="hero-image-main"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </a>
    </Link>
  );
}
