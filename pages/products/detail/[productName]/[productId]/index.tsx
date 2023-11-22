import Head from "next/head";
import ProductsViewIndex from "presentation/components/Products/ProductsView/ProductsViewIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";

const ProductsView = () => {
  return (
    <>
      <Head>
        <title>{process.env.appName}</title>
      </Head>

      <ProductsViewIndex />
    </>
  );
};

export default ProductsView;
