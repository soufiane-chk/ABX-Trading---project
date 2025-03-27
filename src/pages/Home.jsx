import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../styles/Home.css";
import { useLanguage } from '../context/LanguageContext';
import PreFooter from "../components/PreFooter";
import { FaHandsHelping, FaFish, FaCheckCircle, FaBox, FaShippingFast } from "react-icons/fa";

// Banner images
import bannerBackground1 from "../assets/imgbanner1.jpg";
import bannerBackground2 from "../assets/imgbanner2.jpg";
import bannerBackground3 from "../assets/imgbanner3.jpg";
import imgcong from "../assets/imgcong.jpg";
import imgval from "../assets/imgemba1.jpg";
import imgcond from "../assets/imgsupp3.png";
import imgcontrole from "../assets/imgcontrole.jpeg";
import imgselection from "../assets/imgselection.jpeg";
import imgembalage from "../assets/imgemb1.jpeg";
import imgsuivi from "../assets/imgsuivi.jpeg";

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
    icon: <FaShippingFast size={24} />, // Icône associée
    image: imgcong,
  },
  {
    id: 2,
    title: "Traitement et emballage adaptés",
    description: "Nous offrons un service de traitement, de nettoyage et d'emballage de vos produits marins en conformité avec les normes internationales, garantissant ainsi leur fraîcheur et leur qualité jusqu'à leur arrivée.",
    icon: <FaBox size={24} />, // Icône associée
    image: imgval,
  },
  {
    id: 3,
    title: "Support client dédié",
    description: "Notre équipe expérimentée est à votre disposition pour vous fournir un accompagnement personnalisé tout au long du processus, depuis la commande jusqu'à la livraison. Nous nous engageons à répondre à vos besoins et à garantir une expérience client optimale.",
    icon: <FaHandsHelping size={24} />, // Icône associée
    image: imgcond,
  },
];

const whyChooseUs = [
  {
    icon: "🔍",
    title: "Traçabilité et transparence",
    description: "ABXTRADING offre une traçabilité totale de chaque produit, garantissant que vous puissiez suivre l'origine et le parcours de chaque lot de manière transparente."
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
          
          const titleElem = entry.target.querySelector('.service-title');
          const descElem = entry.target.querySelector('.service-description');
          const imgElem = entry.target.querySelector('.service-image-container');
          
          let timers = [];
          if (titleElem) timers.push(setTimeout(() => titleElem.classList.add('animate'), 200));
          if (descElem) timers.push(setTimeout(() => descElem.classList.add('animate'), 400));
          if (imgElem) timers.push(setTimeout(() => imgElem.classList.add('animate'), 100));
          
          return () => {
            timers.forEach(timer => clearTimeout(timer));
          };
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
    <div className={`service-card ${index >= 2 ? 'no-icon' : ''}`} ref={cardRef}>
      <div className="service-number">{`0${index + 1}`}</div>
      <div className="service-image-container">
        <img src={image} alt={title} className="service-image" />
        
        {/* Icône unique représentant l'étape du processus */}
        <div className="process-stage-icon">
          {icon} {/* Utilise l'icône passée en prop */}
        </div>
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
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const images = [bannerBackground1, bannerBackground2, bannerBackground3];

  // Gestion du bouton "Retour en haut"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour remonter en haut
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Gestionnaire unifié pour l'animation de la timeline
  useEffect(() => {
    const handleScroll = () => {
      // Sélectionner la section et les éléments pertinents
      const processSection = document.querySelector('.process-section');
      const waveBackground = document.querySelector('.wave-background');
      const timelineSteps = document.querySelectorAll('.timeline-step');
      const cards = document.querySelectorAll('.service-card');
      
      if (!processSection || !waveBackground || cards.length === 0) {
        console.log("Éléments manquants:", { 
          processSection: !!processSection, 
          waveBackground: !!waveBackground, 
          cards: cards.length 
        });
        return;
      }
      
      // Variables pour calculer la progression
      const sectionTop = processSection.offsetTop;
      const sectionHeight = processSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Trouver la carte la plus visible
      let activeCardIndex = 0;
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height/2;
        if (cardCenter <= windowHeight * 0.7 && rect.bottom > 0) {
          activeCardIndex = Math.max(activeCardIndex, idx);
        }
      });
      
      // Mettre à jour l'état actif
      setActiveStep(activeCardIndex);
      
      // Calculer la progression pour le remplissage
      let progressPercentage = 0;
      if (scrollPosition > sectionTop - windowHeight/2) {
        const scrollableDistance = sectionHeight + windowHeight/2;
        const scrolled = scrollPosition - (sectionTop - windowHeight/2);
        progressPercentage = Math.min(scrolled / scrollableDistance * 100, 100);
        
        // Log pour déboguer
        console.log("Progression:", progressPercentage.toFixed(1) + "%");
      }
      
      // Appliquer la progression au fond de vague
      waveBackground.style.height = `${progressPercentage}%`;
      
      // Activer les cercles appropriés de la timeline
      timelineSteps.forEach((step, idx) => {
        const circle = step.querySelector('.timeline-circle');
        if (idx <= activeCardIndex) {
          if (circle) circle.classList.add('active');
        } else {
          if (circle) circle.classList.remove('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialiser au chargement
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation du carousel
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
    <div className="home-page">
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
        
        {/* Boutons de navigation */}
        <div className="hero-navigation">
          <button className="nav-arrow prev" onClick={handlePrevClick}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="hero-dots">
            {images.map((_, index) => (
              <span 
                key={index} 
                className={`hero-dot ${index === currentImageIndex ? "active" : ""}`} 
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
          
          <button className="nav-arrow next" onClick={handleNextClick}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="hero-content">
          <h1>{t?.hero?.slides?.[currentImageIndex]?.title || heroTexts[currentImageIndex].title}</h1>
          <p>{t?.hero?.slides?.[currentImageIndex]?.description || heroTexts[currentImageIndex].description}</p>
          
          {/* Bouton "Explorer" avec défilement */}
          <button 
            className="cta-button"
            onClick={() => {
              const servicesSection = document.querySelector('.our-services-section');
              if (servicesSection) {
                servicesSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
            {t?.hero?.cta || "Explorer"}
          </button>
        </div>
      </div>

      <div className="our-services-section">
        <div className="section-header-animated">
          <h2 className="animated-title">{t?.services?.title}</h2>
          <div className="title-underline"></div>
          <p className="animated-subtitle">{t?.services?.subtitle}</p>
        </div>
        <div className="services-cards-container">
          {t?.services?.list.map((service, index) => {
            // Tableau d'icônes correspondant à chaque service
            const serviceIcons = [
              <FaShippingFast size={24} />,
              <FaBox size={24} />,
              <FaHandsHelping size={24} />
            ];
            
            return (
              <div key={index} className="service-card">
                <div className="service-image-container">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image"
                  />
                  {/* Utiliser l'icône du tableau */}
                  <div className="service-icon">
                    {serviceIcons[index]}
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="services-section process-section">
        {/* En-tête de la section */}
        <div className="section-header-animated">
          <h2 className="animated-title">{t?.process?.title || "Notre Processus de Production"}</h2>
          <div className="title-underline"></div>
          <p className="animated-subtitle">{t?.process?.subtitle || "Une approche rigoureuse pour garantir la qualité de nos produits"}</p>
        </div>

        {/* Conteneur principal des cartes et de la timeline */}
        <div className="process-container">
          {/* Timeline verticale */}
          <div className="timeline-container wave-timeline">
            <div className="wave-background"></div>
            
            {processusProduction.map((processus, index) => (
              <div 
                key={processus.id} 
                className="timeline-step"
                style={{
                  top: `${(index / (processusProduction.length - 1)) * 100}%`
                }}
              >
                <div className={`timeline-circle ${index === activeStep ? 'active' : ''}`}>
                  <div className="timeline-icon">{processus.icon}</div>
                  <div className="timeline-ripple"></div>
                </div>
                <div className="timeline-connector"></div>
              </div>
            ))}
          </div>

          {/* Cartes de processus */}
          <div className="process-cards">
            {processusProduction.map((processus, index) => (
              <ServiceCard
                key={processus.id}
                title={t?.process?.steps?.[index]?.title || processus.title}
                description={t?.process?.steps?.[index]?.description || processus.description}
                icon={processus.icon}
                image={processus.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="why-choose-us-section">
        <h2 className="section-title">{t?.whyUs?.title || "Pourquoi Nous Choisir"}</h2>
        <p className="section-subtitle">{t?.whyUs?.subtitle || "Des engagements forts pour votre satisfaction"}</p>
        <div className="why-choose-grid">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="why-choose-card">
              <div className="why-choose-icon">
                <span className="icon-circle">{item.icon}</span>
              </div>
              <h3>{t?.whyUs?.reasons?.[index]?.title || item.title}</h3>
              <p>{t?.whyUs?.reasons?.[index]?.description || item.description}</p>
              <div className="card-decoration"></div>
            </div>
          ))}
        </div>
      </div>

      <PreFooter />
      <Footer />
      <WhatsAppButton />

      {/* Éléments décoratifs */}
      <div class="dots-decoration top-right"></div>
      <div class="dots-decoration bottom-left"></div>
      <div class="circle-decoration lg" style={{ top: '-200px', right: '-200px' }}></div>
      <div class="circle-decoration sm" style={{ bottom: '100px', left: '50px' }}></div>

      {/* Bouton retour en haut */}
      {showBackToTop && (
        <div class="back-to-top" onClick={handleBackToTop}>
          <i class="fas fa-arrow-up"></i>
        </div>
      )}
    </div>
  );
};

export default Home;