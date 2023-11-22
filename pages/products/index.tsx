import Head from "next/head";
import ProductsListIndex from "presentation/components/Products/ProductsList/ProductsListIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";

const ProductsList = () => {
  return (
    <>
      <Head>
        <title>{process.env.appName}</title>
      </Head>

      <ProductsListIndex />
    </>
  );
};

export default ProductsList;
