import CategoryProducts from "@/components/CategoryProducts";
import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { getAllCategories } from "@/sanity/helpers/queries";

const Category = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const categories = await getAllCategories();

  return (
    <Container className="py-10 w-full">
      <Title className="text-xl">
        Products by Category:{" "}
        {/* <span className="font-bold text-green-600 capitalize tracking-wide">
          {slug && slug}
        </span> */}
      </Title>
      <CategoryProducts categories={categories} slug={slug} />
    </Container>
  );
};

export default Category;
