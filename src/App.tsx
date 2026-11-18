import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  HeartHandshake,
  House,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import { Header, Logo } from "./components/Header";
import { QuoteForm } from "./components/QuoteForm";
import { Reveal } from "./components/Reveal";
import { business, navigation, services } from "./data";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export default function App() {
  const [selectedService, setSelectedService] = useState({ name: "", key: 0 });
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main">
        <section
          className="hero container"
          id="home"
          aria-labelledby="hero-title"
        >
          <Reveal className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> A FRESHER HOME. A LIGHTER DAY.
            </p>
            <h1 id="hero-title">
              A Cleaner Home.
              <br />A Little More
              <br />
              <em>Peace of Mind.</em>
            </h1>
            <p className="hero-description">
              Reliable, experienced cleaning services across Ilford and
              Redbridge. From regular home cleaning to deep cleans and
              end-of-tenancy cleaning, Lorena helps you enjoy a fresher space.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#quote">
                Request a Free Quote <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#services">
                Explore Services <ArrowDown size={17} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <Check size={15} /> Independent &amp; local
              </span>
              <span>
                <Check size={15} /> No-obligation quotes
              </span>
            </div>
          </Reveal>
          <Reveal className="hero-visual" delay={0.12}>
            <div className="hero-image-frame">
              <img
                src={asset("home-1280.webp")}
                srcSet={`${asset("home-640.webp")} 640w, ${asset("home-1280.webp")} 1280w`}
                sizes="(max-width: 767px) 92vw, 48vw"
                width="1280"
                height="1440"
                fetchPriority="high"
                alt="Sunlit living room with cream armchairs, a tan sofa, a wooden coffee table and leafy plants; illustrative stock photograph"
              />
              <div className="photo-caption">
                A little inspiration for your space · Illustrative photograph
              </div>
            </div>
            <span className="hero-sparkle" aria-hidden="true">
              <Sparkles size={42} strokeWidth={1} />
            </span>
            <div className="experience-card">
              <span className="experience-icon">
                <HeartHandshake size={26} strokeWidth={1.4} />
              </span>
              <div>
                <strong>
                  A personal touch.
                  <br />
                  An experienced pair of hands.
                </strong>
                <span>9 years of professional cleaning experience</span>
              </div>
            </div>
            <div className="hero-side-note" aria-hidden="true">
              A HOME THAT FEELS LIKE HOME
            </div>
          </Reveal>
        </section>

        <div className="benefits-strip">
          <div className="container benefits-inner">
            <div>
              <House size={22} strokeWidth={1.3} />
              <span>
                Care for your home,
                <br className="mobile-break" /> on your terms
              </span>
            </div>
            <div>
              <CalendarDays size={22} strokeWidth={1.3} />
              <span>
                Weekly, fortnightly
                <br className="mobile-break" /> or one-off cleans
              </span>
            </div>
            <div>
              <MapPin size={22} strokeWidth={1.3} />
              <span>
                Local to Ilford
                <br className="mobile-break" /> &amp; Redbridge
              </span>
            </div>
          </div>
        </div>

        <section
          className="section container"
          id="services"
          aria-labelledby="services-title"
        >
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">A CLEAN FOR EVERY CHAPTER</p>
              <h2 id="services-title">
                Your space.
                <br />
                <em>Your kind of clean.</em>
              </h2>
            </div>
            <p>
              From a little regular help to a complete fresh start,
              <br className="desktop-break" /> find the cleaning service that
              fits your home.
            </p>
          </Reveal>
          <div className="services-grid">
            {services.map(({ name, icon: Icon, tag, description }, index) => (
              <Reveal
                className="service-card"
                key={name}
                delay={(index % 3) * 0.045}
              >
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon size={26} strokeWidth={1.35} />
                  </span>
                  <span className="service-number">0{index + 1}</span>
                </div>
                <p className="service-tag">{tag}</p>
                <h3>{name}</h3>
                <p className="service-description">{description}</p>
                <a
                  className="service-link"
                  href="#quote"
                  onClick={() =>
                    setSelectedService((previous) => ({
                      name,
                      key: previous.key + 1,
                    }))
                  }
                  aria-label={`Enquire about ${name}`}
                >
                  Enquire about this service <ArrowUpRight size={17} />
                </a>
              </Reveal>
            ))}
          </div>
          <p className="services-note">
            <Leaf size={16} /> Your home, your preferences. Cleaning products
            and equipment can be discussed when you enquire.
          </p>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <Reveal className="about-visual">
              <img
                loading="lazy"
                decoding="async"
                src={asset("interior-960.webp")}
                width="960"
                height="1100"
                alt="Sunlit open-plan home with a dark dining table, grey chairs, flowers and a wooden kitchen; illustrative stock photograph"
              />
              <div className="about-photo-note">
                A little everyday calm. <Leaf size={23} strokeWidth={1.2} />
              </div>
              <span className="illustrative-label">
                Illustrative home photography
              </span>
            </Reveal>
            <Reveal className="about-copy">
              <p className="eyebrow">A LOCAL CLEANER. A PERSONAL APPROACH.</p>
              <h2 id="about-title">
                Meet Lorena.
                <br />
                <em>A helping hand for your home.</em>
              </h2>
              <p>
                With nine years of professional cleaning experience, Lorena is
                an independent, self-employed cleaner serving Ilford, Redbridge
                and the surrounding area.
              </p>
              <p>
                Working with an independent cleaner means you can speak directly
                with the person caring for your space. Tell Lorena what matters
                to you, ask questions and agree the details together.
              </p>
              <div className="why-choose">
                <h3>Why choose Lorena?</h3>
                {[
                  "Nine years of professional cleaning experience",
                  "Regular cleans and one-off fresh starts",
                  "Experience with new-build and renovated properties",
                  "Local service across Ilford and Redbridge",
                  "Cleaning supplies discussed around your preferences",
                ].map((text) => (
                  <div key={text}>
                    <span>
                      <Check size={13} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
              <a className="text-link" href="#contact">
                Have a chat with Lorena <ArrowUpRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>

        <section
          className="how-section"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <div className="container">
            <Reveal className="how-heading">
              <p className="eyebrow">LESS TO DO. MORE TIME FOR YOU.</p>
              <h2 id="how-title">
                A fresh start, <em>in three simple steps.</em>
              </h2>
              <p>Good things begin with a conversation.</p>
            </Reveal>
            <div className="steps-grid">
              {[
                {
                  number: "01",
                  icon: MessageCircle,
                  title: "Tell Lorena what you need",
                  text: "Share a little about your home, the service you’re looking for and when you’d like a clean.",
                },
                {
                  number: "02",
                  icon: House,
                  title: "Talk through the details",
                  text: "Discuss your property, your preferences and the work involved. Request a free, no-obligation quotation.",
                },
                {
                  number: "03",
                  icon: CalendarDays,
                  title: "Arrange your clean",
                  text: "Once you’re happy with the details, agree the scope and a suitable time directly with Lorena.",
                },
              ].map(({ number, icon: Icon, title, text }) => (
                <Reveal className="step" key={number}>
                  <div className="step-top">
                    <span>{number}</span>
                    <Icon size={27} strokeWidth={1.2} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
            <p className="workflow-note">
              A suggested enquiry journey for this website concept. Lorena’s
              existing booking process has not been confirmed.
            </p>
          </div>
        </section>

        <section
          className="area-section container"
          aria-labelledby="area-title"
        >
          <Reveal className="area-card">
            <div className="area-mark" aria-hidden="true">
              <span />
              <span />
              <MapPin size={37} strokeWidth={1.25} />
            </div>
            <div className="area-copy">
              <p className="eyebrow">CLOSE TO HOME</p>
              <h2 id="area-title">
                Proudly local to <em>Ilford &amp; Redbridge.</em>
              </h2>
              <p>
                Cleaning for homes in Ilford, Redbridge and surrounding areas.
                Lorena has her own transport — share your postcode to check
                availability in your area.
              </p>
            </div>
            <a href="#quote" className="text-link">
              Ask about your area <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </section>

        <section
          className="quote-section"
          id="quote"
          aria-labelledby="quote-title"
        >
          <div className="container quote-layout">
            <Reveal className="quote-copy">
              <p className="eyebrow">LET’S MAKE ROOM FOR A FRESH START</p>
              <h2 id="quote-title">
                A cleaner home
                <br />
                starts with
                <br />
                <em>a conversation.</em>
              </h2>
              <p>
                Tell Lorena a little about your space and the help you need.
                Request a free quotation, with no obligation.
              </p>
              <div className="quote-points">
                <span>
                  <Check size={16} /> A clean that suits your needs
                </span>
                <span>
                  <Check size={16} /> Speak directly with Lorena
                </span>
                <span>
                  <Check size={16} /> Agree the details before you book
                </span>
              </div>
              <div className="direct-contact">
                <span className="contact-round">
                  <Phone size={23} strokeWidth={1.3} />
                </span>
                <div>
                  <p>Prefer a real conversation?</p>
                  <a href={business.tel}>
                    {business.phone} <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              <div className="quote-decoration" aria-hidden="true">
                <Leaf size={155} strokeWidth={0.6} />
                <Sparkles size={35} strokeWidth={1} />
              </div>
            </Reveal>
            <Reveal className="form-panel">
              <QuoteForm selectedService={selectedService} />
            </Reveal>
          </div>
        </section>

        <section
          className="contact-section container"
          id="contact"
          aria-labelledby="contact-title"
        >
          <Reveal>
            <div className="contact-heading">
              <div>
                <p className="eyebrow">SAY HELLO</p>
                <h2 id="contact-title">
                  Let’s talk about <em>your home.</em>
                </h2>
              </div>
              <p>For a real enquiry, get in touch with Lorena directly.</p>
            </div>
            <div className="contact-grid">
              <a className="contact-card" href={business.tel}>
                <Phone size={24} strokeWidth={1.3} />
                <span>
                  <strong>Give Lorena a call</strong>
                  <span>{business.phone}</span>
                </span>
                <ArrowUpRight size={18} />
              </a>
              <a className="contact-card" href={`mailto:${business.email}`}>
                <Mail size={24} strokeWidth={1.3} />
                <span>
                  <strong>Send an email</strong>
                  <span>{business.email}</span>
                </span>
                <ArrowUpRight size={18} />
              </a>
              <a
                className="contact-card"
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={24} strokeWidth={1.3} />
                <span>
                  <strong>Try WhatsApp</strong>
                  <span>Account availability unverified</span>
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>
            <a
              className="nextdoor-link"
              href={business.nextdoor}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find Lorena’s original public profile on Nextdoor{" "}
              <ChevronRight size={15} />
            </a>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Logo light />
              <p>
                A fresher space.
                <br />A little more time for you.
              </p>
            </div>
            <div className="footer-nav">
              <span>EXPLORE</span>
              {navigation
                .filter(([, id]) => id !== "home")
                .map(([label, id]) => (
                  <a href={`#${id}`} key={id}>
                    {label}
                  </a>
                ))}
            </div>
            <div className="footer-contact">
              <span>GET IN TOUCH</span>
              <a href={business.tel}>{business.phone}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <p>Ilford &amp; Redbridge, London</p>
              <a className="footer-quote" href="#quote">
                Get a Free Quote <ArrowRight size={15} />
              </a>
            </div>
            <div className="footer-signoff">
              <Leaf size={31} strokeWidth={1} />
              <span>
                A little care.
                <br />
                <em>A lovely difference.</em>
              </span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              Independent website concept — not affiliated with or endorsed by
              Lorena-Cleaning Services.
            </p>
            <p>
              Stock photography is illustrative.{" "}
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash licence <ArrowUpRight size={11} />
              </a>
            </p>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}
