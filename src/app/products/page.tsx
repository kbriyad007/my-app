// app/products/page.tsx
import Storyblok from "@/lib/storyblok";
import ProductCardsWrapper from "@/components/ProductCardsWrapper";
import ProductSlider from "@/components/ProductSlider";

interface Product {
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  slug: string;
}

interface StoryblokStory {
  content: Omit<Product, "slug">;
  slug: string;
}

export default async function ProductsPage() {
  // Fetch products
  const { data: productsData } = await Storyblok.get("cdn/stories", {
    starts_with: "products/",
    version: "published",
  });

  const stories: StoryblokStory[] = productsData.stories;

  const products: Product[] = stories.map((story) => ({
    name: story.content.name,
    price: story.content.price,
    image: story.content.image,
    sizes: story.content.sizes,
    colors: story.content.colors,
    Category: story.content.Category,
    Description: story.content.description,
    slug: story.slug,
  }));

  // Hardcoded slider images
  const sliderImages: string[] = [
    "https://picsum.photos/id/1011/1600/900",
    "https://picsum.photos/id/1025/1600/900",
    "https://picsum.photos/id/1035/1600/900",
    "https://picsum.photos/id/1041/1600/900",
    "https://picsum.photos/id/1050/1600/900",
  ];

  return (
    <div className="space-y-8">
      {/* Product Slider */}
      <ProductSlider images={sliderImages} />

      {/* Product Cards */}
      <ProductCardsWrapper products={products} />
    </div>
  );
}
