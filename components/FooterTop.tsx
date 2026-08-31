import { Clock10Icon, Mail, MapPin, Phone } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: Props[] = [
  {
    title: "Visit Us",
    subtitle: "Vancouver, BC, Canada",
    icon: (
      <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+12 958 648 597",
    icon: (
      <Phone className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Operating Hours",
    subtitle: "Mon - Sun: 10:00 AM to 11:00 PM",
    icon: (
      <Clock10Icon className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "info@lulu.ca",
    icon: (
      <Mail className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
];

export const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data?.map((item, index) => (
        <ContactItem
          key={index}
          title={item?.title}
          subtitle={item?.subtitle}
          icon={item?.icon}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ title, subtitle, icon }: Props) => {
  return (
    <div className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
      {icon}
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-darkColor transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
