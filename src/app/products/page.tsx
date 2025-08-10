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

interface SliderItem {
  image: string;
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
    description: story.content.description,
    slug: story.slug,
  }));

  // Fetch slider images (assuming they are under "product-slider/" in Storyblok)
  const { data: sliderData } = await Storyblok.get("cdn/stories", {
    starts_with: "product-slider/",
    version: "published",
  });

  const sliderImages: string[] = sliderData.stories.map(
    (story: { content: SliderItem }) => story.content.image
  );

  return (
    <div className="space-y-8">
      {/* Product Slider */}
      <ProductSlider images={sliderImages} />

      {/* Product Cards */}
      <ProductCardsWrapper products={products} />
    </div>
  );
}
