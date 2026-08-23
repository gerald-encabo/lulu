import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <Container className="max-w-3xl px-4 sm:px-6 lg:px8 py-12">
      <Title className="text-3xl font-bold mb-6">Contact Us</Title>
      <p className="mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non commodi
        nemo minus adipisci dolor.
      </p>
      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            className="w-full px-3 py-2 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            className="w-full px-3 py-2 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            className="w-full px-3 py-2 border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-darkColor/80 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-darkColor hoverEffect"
        >
          Send Message
        </button>
      </form>
    </Container>
  );
};

export default Contact;
