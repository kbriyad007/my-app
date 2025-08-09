// app/products/page.tsx
import Storyblok from "@/lib/storyblok";
import ProductCardsWrapper from "@/components/ProductCardsWrapper";

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
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "products/",
    version: "published",
  });

  const stories: StoryblokStory[] = data.stories;

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

  return <ProductCardsWrapper products={products} />;
}
