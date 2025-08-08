import Storyblok from "@/lib/storyblok";
import ProductCards from "@/components/ProductCards";

interface StoryblokProduct {
  name: string;
  slug: string;
  content: {
    name: string;
    price: number;
    image: string;
    category: {
      id: string;
      url: string;
      linktype: string;
      fieldtype: string;
      cached_url: string;
    } | undefined;
  };
}

interface CategoryStory {
  name: string;
  slug: string;
  content: {
    Name: string;
    Slug: string;
    Description?: string;
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: categorySlug } = await params;

  try {
    // Fetch both products and categories
    const [productsResponse, categoryResponse] = await Promise.all([
      Storyblok.get("cdn/stories", {
        starts_with: "products/",
        version: "published",
      }),
      Storyblok.get("cdn/stories", {
        starts_with: "category/",
        version: "published",
      }),
    ]);

    const allProducts: StoryblokProduct[] = productsResponse.data.stories;
    const categories: CategoryStory[] = categoryResponse.data.stories;

    // Find current category
    const currentCategory = categories.find(
      (cat) =>
        cat.slug === `category/${categorySlug}` ||
        cat.content.Slug === categorySlug
    );

    // Filter products by category
    const filteredProducts = allProducts.filter((product) => {
      const productCategory = product.content.category;

      if (!productCategory || !productCategory.cached_url) {
        return false;
      }

      // Extract the category slug from cached_url (e.g., "category/tws" -> "tws")
      const categoryFromUrl = productCategory.cached_url.replace(
        "category/",
        ""
      );

      return categoryFromUrl.toLowerCase() === categorySlug.toLowerCase();
    });

    const categoryName = currentCategory?.content?.Name || categorySlug;

    // Transform StoryblokProduct[] into Product[] expected by ProductCards
    const productsForCards = filteredProducts.map((product) => ({
      id: product.slug,
      name: product.content.name,
      price: product.content.price,
      image: product.content.image,
      sizes: [], // Fill with real sizes if you have them
      colors: [], // Fill with real colors if you have them
      Category: "", // Fill with real category if you want
      description: "", // Fill with real description if you want
      slug: product.slug,
    }));

    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName}</h1>

        {productsForCards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in the &quot;{categoryName}&quot; category.
            </p>
          </div>
        ) : (
          <ProductCards products={productsForCards} />
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <div className="bg-red-100 p-4 rounded-lg">
          <p>
            Error loading data:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }
}
