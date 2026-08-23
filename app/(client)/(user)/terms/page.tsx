import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { termsData } from "@/constants";

const Term = () => {
  return (
    <Container className="max-w-3xl sm:px-6 lg:px-8 py-12">
      <Title className="text-3xl font-bold mb-6">Terms and Conditions</Title>
      <div className="space-y-4">
        {termsData?.map((term, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-2">
              <span>{index + 1}. </span>
              {term?.title}
            </h2>
            <p>{term?.info}</p>
          </section>
        ))}
      </div>
    </Container>
  );
};

export default Term;
