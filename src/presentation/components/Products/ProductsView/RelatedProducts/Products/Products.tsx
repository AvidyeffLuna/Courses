import ProductCard from "presentation/components/common/Products/ProductCard/ProductCard";
import { useId, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

export default function Products() {
  const [products] = useState([
    {
      productId: useId(),
      pictureUrl:
        "https://img.freepik.com/foto-gratis/celebrando-mujer-vestido-lentejuelas-doradas-bailando-divirtiendose_273443-5021.jpg?w=740&t=st=1661223031~exp=1661223631~hmac=cd9987eea786aee5271ebe3c0cfd5b1f0f10d636c22ec8c68cfca995eb840859",
      name: "Vestido color dorado Armani",
      price: "$120.00",
    },
    {
      productId: useId(),
      pictureUrl:
        "https://img.freepik.com/foto-gratis/persona-otono-hermoso-sombrero_23-2149137837.jpg?w=360&t=st=1661224023~exp=1661224623~hmac=b2584c5d891307d711695ce22bd42b3c35bd685d85bb8bcd7c87fd614bd6cb44",
      name: "Conjunto marrón para caballero",
      price: "$65.00",
    },
    {
      productId: useId(),
      pictureUrl:
        "https://img.freepik.com/foto-gratis/joven-novia-hermosa-mujer-vestido-novia-blanco-largo-pentecostes_7502-4886.jpg?w=360&t=st=1661224095~exp=1661224695~hmac=3f8f8a81dd9271dc8a6632b8214654ce220ec0ba60a0ef6a79a213d0def82214",
      name: "Vestido de novia blanco",
      price: "$150.00",
    },
    {
      productId: useId(),
      pictureUrl:
        "https://img.freepik.com/foto-gratis/mujer-elegante-traje-verano-aislado-posando-tendencia-moda-aislada_285396-472.jpg?w=740&t=st=1661224189~exp=1661224789~hmac=674bfef49f03ad890bf489911beebd16a52645b47c98ad4a48e7c53f54eb75de",
      name: "Traje de verano para chicas",
      price: "$23.00",
    },
    {
      productId: useId(),
      pictureUrl:
        "https://img.freepik.com/psd-gratis/mockup-simple-sudadera-capucha-blanca-psd-ropa-hombre-comoda-deportiva_53876-98582.jpg?w=740&t=st=1661224261~exp=1661224861~hmac=9b07989e97bbade96f821a782d3e185d4b62829d71fc519032774c4d37cbe304",
      name: "Sudadera blanca deportiva",
      price: "$76.00",
    },
    {
      productId: useId(),
      pictureUrl:
        "https://img.freepik.com/foto-gratis/retrato-cuerpo-entero-apuesto-hombre-serio_171337-17388.jpg?t=st=1661224354~exp=1661224954~hmac=f95e3e4eda45349830cd779c04352278fc8890975247db0173b4dda48725bfc1",
      name: "Traje elegante de caballero",
      price: "$87.00",
    },
  ]);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={4}
      spaceBetween={30}
    >
      {products.map((product) => (
        <SwiperSlide key={product.productId}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
