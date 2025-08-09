// app/products/page.tsx
import Storyblok from "@/lib/storyblok";
import ProductCardsWrapper from "@/components/ProductCardsWrapper";

interface Product {
  name: string;
  price: string | number;
  image: string;
  sizes: string[];
  colors: string[];
  category: string;
  description: string;
  slug: string;
}

interface StoryblokStory {
  content: {
    name: string;
    price: string;
    image: string | { filename: string };
    sizes?: string[];
    colors?: string[];
    category?: string | { cached_url?: string };
    description?: string;
  };
  slug: string;
}

export default async function ProductsPage() {
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "products/",
    version: "published",
  });

  const stories: StoryblokStory[] = data.stories;

  const products: Product[] = stories.map((story) => {
    // Get image URL string safely
    let image = "";
    if (typeof story.content.image === "string") {
      image = story.content.image.startsWith("//")
        ? "https:" + story.content.image
        : story.content.image;
    } else if (story.content.image?.filename) {
      image = "https:" + story.content.image.filename;
    }

    // Get category string safely
    let category = "";
    if (typeof story.content.category === "string") {
      category = story.content.category;
    } else if (story.content.category?.cached_url) {
      // If category is an object with cached_url, maybe use cached_url or set empty
      category = ""; // or some fallback, depending on your data
    }

    // Convert price to number if possible, else keep string
    const priceNum = Number(story.content.price);
    const price = isNaN(priceNum) ? story.content.price : priceNum;

    return {
      name: story.content.name,
      price,
      image,
      sizes: story.content.sizes || [],
      colors: story.content.colors || [],
      category,
      description: story.content.description || "",
      slug: story.slug,
    };
  });

  return <ProductCardsWrapper products={products} />;
}
