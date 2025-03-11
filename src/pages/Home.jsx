import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../styles/Home.css";

// Banner images
import bannerBackground1 from "../assets/imgbanner1.jpg";
import bannerBackground2 from "../assets/imgbanner2.jpg";
import bannerBackground3 from"../assets/imgbanner3.jpg"
import imgcong from "../assets/imgcong.jpg";
import imgval from "../assets/imgemba1.jpg";
import imgcond from "../assets/imgsupp3.png";
import imgcontrole from "../assets/imgcontrole.jpeg";
import imgselection from "../assets/imgselection.jpeg";
import imgembalage from "../assets/imgemb1.jpeg";
import imgsuivi from "../assets/imgsuivi.jpeg";

// Icons
import { 
  FaBox, 
  FaShippingFast, 
  FaHandsHelping, 
  FaCheckCircle,
  FaFish 
} from "react-icons/fa";

// Data constants
const heroTexts = [
  {
    title: "ABXTRADING",
    description: "ABXTRADING est un groupe marocain de premier plan, spécialisé dans l'exportation de poissons et de fruits de mer frais et vivants."
  },
  {
    title: "Qualité Supérieure",
    description: "Nous nous engageons à fournir des produits marins de qualité supérieure, tout en respectant les normes les plus strictes en matière de durabilité et de sécurité alimentaire."
  },
  {
    title: "Engagement et Durabilité",
    description: "Notre engagement envers la durabilité et la sécurité alimentaire est au cœur de notre mission, garantissant des produits de la mer de la plus haute qualité."
  }
];

const services = [
  {
    id: 1,
    title: "Exportation de poissons et fruits de mer frais et vivants",
    description: "Grâce à notre réseau mondial, nous assurons des livraisons fiables et ponctuelles de poissons et fruits de mer frais vivants et congelés, adaptés aux besoins des marchés internationaux.",
    icon: <FaShippingFast size={24} />,
    image: imgcong // Remplacez par vos images réelles
  },
  {
    id: 2,
    title: "Traitement et emballage adaptés",
    description: "Nous offrons un service de traitement, de nettoyage et d’emballage de vos produits marins en conformité avec les normes internationales, garantissant ainsi leur fraîcheur et leur qualité jusqu'à leur arrivée.",
    icon: <FaBox size={24} />,
    image: imgval // Remplacez par vos images réelles
  },
  {
    id: 3,
    title: "Support client dédié",
    description: "Notre équipe expérimentée est à votre disposition pour vous fournir un accompagnement personnalisé tout au long du processus, depuis la commande jusqu’à la livraison. Nous nous engageons à répondre à vos besoins et à garantir une expérience client optimale.",
    icon: <FaHandsHelping size={24} />,
    image: imgcond // Remplacez par vos images réelles
  }
];

const whyChooseUs = [
  {
    icon: "🔍",
    title: "Traçabilité et transparence",
    description: "ABXTRADING offre une traçabilité totale de chaque produit, garantissant que vous puissiez suivre l’origine et le parcours de chaque lot de manière transparente."
  },
  {
    icon: "⏱️",
    title: "Délais de livraison garantis",
    description: "Nous savons à quel point la ponctualité est cruciale. Nous assurons des délais de livraison respectés grâce à une gestion efficace de nos flux logistiques."
  },
  {
    icon: "🤝",
    title: "Partenaire de confiance",
    description: "Avec ABXTRADING, vous bénéficiez d'un partenaire fiable, capable de fournir des solutions de qualité adaptées aux exigences spécifiques de vos marchés. Nous privilégions une relation de long terme fondée sur la confiance et l'excellence."
  }
];

const processusProduction = [
  {
    id: 1,
    title: "Sélection des Produits",
    description: "Nos produits sont soigneusement sélectionnés par nos experts en fonction de leur fraîcheur, leur taille et leur qualité. Nous établissons des partenariats solides avec une expérience de 20 ans",
    icon: <FaFish size={24} />,
    image: imgselection
  },
  {
    id: 2,
    title: "Contrôle de la Qualité",
    description: "Chaque produit subit un contrôle qualité rigoureux. Nous vérifions la fraîcheur, l'aspect, l'odeur et la texture des poissons et fruits de mer. Notre processus de contrôle de qualité est conforme aux normes de sécurité alimentaire internationales.",
    icon: <FaCheckCircle size={24} />,
    image: imgcontrole
  },
  {
    id: 3,
    title: "Emballage et Expédition",
    description: "Après avoir été triés et préparés, les produits sont emballés dans des conditions optimales pour garantir leur fraîcheur. Nous utilisons des techniques d'emballage adaptées aux produits vivants et frais ou congelés, en veillant à maintenir une température constante pendant le transport.",
    icon: <FaBox size={24} />,
    image: imgembalage
  },
  {
    id: 4,
    title: "Suivi et Livraison",
    description: "Grâce à notre partenariat avec des transporteurs de confiance, nous assurons un suivi constant de chaque expédition. Vous pouvez suivre l'acheminement de vos produits en temps réel et être assuré qu'ils arrivent dans des conditions optimales.",
    icon: <FaShippingFast size={24} />,
    image: imgsuivi
  }
];

// ServiceCard Component
const ServiceCard = ({ title, description, icon, image, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div className="service-card" ref={cardRef}>
      <div className="service-image-container">
        <img src={image} alt={title} className="service-image" />
        <div className="service-icon-circle">{icon}</div>
      </div>
      <div className="service-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
      </div>
    </div>
  );
};

// Main Component
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const images = [bannerBackground1, bannerBackground2, bannerBackground3];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.services-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progressValue = Math.max(0, Math.min(100, 
          ((windowHeight - rect.top) / (rect.height + windowHeight)) * 100
        ));
        setProgress(progressValue);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.services-section');
      const cards = document.querySelectorAll('.service-card');
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];
      const progress = document.querySelector('.timeline-progress');
      const fish = document.querySelector('.timeline-fish');

      if (section && firstCard && lastCard && progress && fish) {
        // Calculate section boundaries
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = window.pageYOffset + sectionRect.top;
        const firstCardTop = firstCard.offsetTop;
        const lastCardBottom = lastCard.offsetTop + lastCard.offsetHeight;
        
        // Calculate scroll progress
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        const scrollStart = sectionTop + firstCardTop;
        const scrollEnd = sectionTop + lastCardBottom;
        const scrollRange = scrollEnd - scrollStart;

        // Calculate progress percentage with smooth easing
        let progressPercentage = ((scrollPosition - scrollStart) / scrollRange) * 100;
        progressPercentage = Math.max(0, Math.min(100, progressPercentage));

        // Apply smooth easing function
        const easedProgress = easeInOutCubic(progressPercentage / 100) * 100;

        // Update progress bar and fish position with smooth transition
        progress.style.height = `${easedProgress}%`;
        fish.style.top = `${easedProgress}%`;

        // Rotate fish based on scroll direction
        const currentScroll = window.pageYOffset;
        const rotation = currentScroll > (fish._lastScroll || 0) ? 90 : 270;
        fish.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        fish._lastScroll = currentScroll;

        // Add swimming animation class when moving
        if (progressPercentage > 0 && progressPercentage < 100) {
          fish.classList.add('swimming');
        } else {
          fish.classList.remove('swimming');
        }
      }
    };

    // Easing function for smooth animation
    const easeInOutCubic = (x) => {
      return x < 0.5 
        ? 4 * x * x * x 
        : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="app">
      <Header />
      
      <div className="hero-section">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Background ${index + 1}`}
            className={`hero-image ${index === currentImageIndex ? "active" : ""}`}
          />
        ))}
        <div className="hero-content">
          <h1>{heroTexts[currentImageIndex].title}</h1>
          <p>{heroTexts[currentImageIndex].description}</p>
          <button className="cta-button">Explorer</button>
        </div>
        <button className="prev-button" onClick={handlePrevClick}>❮</button>
        <button className="next-button" onClick={handleNextClick}>❯</button>
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="our-services-section">
        <h2 className="section-title">Nos Services</h2>
        <p className="section-subtitle">Des solutions complètes pour vos besoins</p>
        <div className="services-cards-container">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card-new"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="service-icon-wrapper">
                {service.icon}
                <div className="icon-background"></div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="services-section">
        <h2 className="section-title">Notre Processus de Production</h2>
        <p className="section-subtitle">
          Une approche rigoureuse pour garantir la qualité de nos produits
        </p>
        <div className="services-container">
          <div className="timeline-wrapper">
            <div className="timeline-line"></div>
            <div 
              className="timeline-progress"
              style={{ height: `${progress}%` }}
            >
              <div 
                className="timeline-fish"
                style={{ top: `${progress}%` }}
              >
                <FaFish />
              </div>
            </div>
          </div>
          {processusProduction.map((processus, index) => (
            <ServiceCard
              key={processus.id}
              title={processus.title}
              description={processus.description}
              icon={processus.icon}
              image={processus.image}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="why-choose-us-section">
        <h2 className="section-title">Pourquoi Nous Choisir</h2>
        <p className="section-subtitle">Des engagements forts pour votre satisfaction</p>
        <div className="why-choose-grid">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="why-choose-card">
              <div className="why-choose-icon">
                <span className="icon-circle">{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="card-decoration"></div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;