import AllProductCard from "./AllProductCard";

interface Product {
  id?: string;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  slug: string;
}

export default function ProductCards({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <AllProductCard
          key={product.slug}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
