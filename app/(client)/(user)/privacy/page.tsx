import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { privaciesData } from "@/constants";

const Privacy = () => {
  return (
    <Container className="max-w-3xl sm:px-6 lg:px-8 py-12">
      <Title className="text-3xl font-bold mb-6">Terms and Conditions</Title>
      <div className="space-y-4">
        {privaciesData?.map((privacy, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-2">
              <span>{index + 1}. </span>
              {privacy?.title}
            </h2>
            <p>{privacy?.info}</p>
          </section>
        ))}
      </div>
    </Container>
  );
};

export default Privacy;
