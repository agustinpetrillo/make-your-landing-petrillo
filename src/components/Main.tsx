import ItemListContainer from "./containers/ItemListContainer";
import ProductsCategory from "./shared/ProductsCategory";

export default function Main() {
  return (
    <main>
      <ProductsCategory />
      <ItemListContainer message="This will be an e-commerce papa" />
    </main>
  );
}
