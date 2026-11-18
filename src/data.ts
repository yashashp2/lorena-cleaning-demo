import {
  House,
  Sparkles,
  KeyRound,
  PaintRoller,
  SprayCan,
  Truck,
} from "lucide-react";

export const business = {
  phone: "07831 039380",
  tel: "tel:+447831039380",
  email: "lorenalunea@yahoo.com",
  whatsapp: "https://wa.me/447831039380",
  nextdoor:
    "https://nextdoor.co.uk/pages/lorena-cleaning-services-ilford-england/",
};

export const navigation = [
  ["Home", "home"],
  ["Services", "services"],
  ["About", "about"],
  ["How It Works", "how-it-works"],
  ["Contact", "contact"],
] as const;

export const services = [
  {
    name: "Regular House Cleaning",
    icon: House,
    tag: "A LITTLE EVERYDAY EASE",
    description:
      "Keep on top of the everyday with weekly or fortnightly cleaning, arranged around your home and your needs.",
  },
  {
    name: "Deep Cleaning",
    icon: Sparkles,
    tag: "A FRESH START",
    description:
      "Give your space a more thorough clean. Discuss the rooms and details that could use some extra attention.",
  },
  {
    name: "End-of-Tenancy Cleaning",
    icon: KeyRound,
    tag: "READY FOR THE NEXT CHAPTER",
    description:
      "Moving on? Arrange a clean for the end of your tenancy, with the scope agreed for your property.",
  },
  {
    name: "After-Builders Cleaning",
    icon: PaintRoller,
    tag: "AFTER THE DUST SETTLES",
    description:
      "Cleaning for newly built and renovated properties, helping you enjoy the space after the work is done.",
  },
  {
    name: "One-Off Cleaning",
    icon: SprayCan,
    tag: "A HELPING HAND",
    description:
      "An occasional clean when you need it. Ideal for a seasonal refresh or simply catching up on your home.",
  },
  {
    name: "Move-In / Move-Out Cleaning",
    icon: Truck,
    tag: "MAKE YOURSELF AT HOME",
    description:
      "Start fresh in your new space or leave your old one feeling cared for. Discuss a clean to suit your move.",
  },
];
