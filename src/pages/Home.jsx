import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../styles/Home.css";
import { useLanguage } from '../context/LanguageContext';
import PreFooter from "../components/PreFooter";
import { FaHandsHelping } from "react-icons/fa";
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
import { FaFish, FaCheckCircle, FaBox, FaShippingFast } from "react-icons/fa";

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
    description: "Nos produits sont soigneusement sélectionnés par nos experts en fonction de leur fraîcheur, leur taille et leur qualité.",
    icon: <FaFish size={24} />, // Icône pour la sélection des produits
    image: imgselection
  },
  {
    id: 2,
    title: "Contrôle de la Qualité",
    description: "Chaque produit subit un contrôle qualité rigoureux pour garantir sa fraîcheur et sa sécurité.",
    icon: <FaCheckCircle size={24} />, // Icône pour le contrôle qualité
    image: imgcontrole
  },
  {
    id: 3,
    title: "Emballage et Expédition",
    description: "Les produits sont emballés dans des conditions optimales pour préserver leur fraîcheur.",
    icon: <FaBox size={24} />, // Icône pour l'emballage
    image: imgembalage
  },
  {
    id: 4,
    title: "Suivi et Livraison",
    description: "Nous assurons un suivi constant pour garantir une livraison rapide et sécurisée.",
    icon: <FaShippingFast size={24} />, // Icône pour le suivi et la livraison
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
          
          // Animation progressive des éléments internes
          const titleElem = entry.target.querySelector('.service-title');
          const descElem = entry.target.querySelector('.service-description');
          const imgElem = entry.target.querySelector('.service-image-container');
          
          // Ajouter des vérifications avant setTimeout
          let timers = [];
          if (titleElem) timers.push(setTimeout(() => titleElem.classList.add('animate'), 200));
          if (descElem) timers.push(setTimeout(() => descElem.classList.add('animate'), 400));
          if (imgElem) timers.push(setTimeout(() => imgElem.classList.add('animate'), 100));
          
          // Nettoyer les timers si le composant est démonté
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
        {index < 2 && (
          <div className="service-icon-circle">{icon}</div>
        )}
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
  const [progress, setProgress] = useState(0);
  const images = [bannerBackground1, bannerBackground2, bannerBackground3];

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction améliorée pour le retour en haut avec reset de la barre de progression
  const handleBackToTop = () => {
    const progressBar = document.querySelector('.timeline-progress');
    const processSection = document.querySelector('.services-section.process-section');

    if (progressBar) {
      progressBar.classList.add('reset');
      progressBar.style.height = '5%'; // Réinitialiser la barre de progression
    }
  
    // Si la section "process-section" existe, scroller vers son début
    if (processSection) {
      processSection.scrollIntoView({
        behavior: 'smooth', // Défilement fluide
        block: 'start' // Aligner au début de la section
      });
    } else {
      // Sinon, scroller vers le haut de la page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  
    // Réactiver la transition lente après le retour en haut
    setTimeout(() => {
      if (progressBar) {
        progressBar.classList.remove('reset');
      }
    }, 300); // Réduit le délai à 300ms pour un retour plus rapide
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.services-section.process-section');
      const progress = document.querySelector('.timeline-progress');
      
      if (section && progress) {
        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Si la section est visible
        if (sectionRect.top < viewportHeight && sectionRect.bottom > 0) {
          let progressValue;
          
          if (sectionRect.top >= 0) {
            // Au début de la section
            progressValue = 5;
          } else if (sectionRect.bottom <= viewportHeight) {
            // Section complètement visible dans la fenêtre
            progressValue = 100;
          } else {
            // Calcul basé sur combien on a défilé
            const totalHeight = section.offsetHeight;
            const visibleHeight = Math.min(viewportHeight, sectionRect.bottom) - Math.max(0, sectionRect.top);
            const scrollProgress = (Math.abs(sectionRect.top) + visibleHeight) / totalHeight;
            progressValue = Math.min(100, Math.max(5, scrollProgress * 100));
          }
          
          // Appliquer la hauteur
          progress.style.height = `${progressValue}%`;
          setProgress(progressValue);
          console.log("Progress updated to: ", progressValue);
        }
      }
    };
    
    // Ajouter plus d'événements pour capturer tous les types de défilement
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Exécuter immédiatement
    handleScroll();
    
    // Exécuter après un court délai pour s'assurer que tout est chargé
    const timers = [
      setTimeout(handleScroll, 100),
      setTimeout(handleScroll, 500),
      setTimeout(handleScroll, 1000)
    ];
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Remplacez l'useEffect qui contient resetProgress
  useEffect(() => {
    // Réinitialiser la barre uniquement au montage initial, pas lors des scrolls
    const initializeProgress = () => {
      const progress = document.querySelector('.timeline-progress');
      if (progress) {
        // Définir une valeur initiale de 5%
        progress.style.height = '5%';
      }
    };
    
    // Initialiser la progress bar
    initializeProgress();
    
    let positionTimer;
    // Vérifier si nous sommes déjà dans la vue de la section
    const checkInitialPosition = () => {
      const section = document.querySelector('.services-section');
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        // Si la section est déjà visible à l'écran au chargement
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
          // Déclencher un événement de défilement pour mettre à jour la progression
          window.dispatchEvent(new Event('scroll'));
        }
      }
    };
    
    // Vérifier la position initiale après un court délai
    positionTimer = setTimeout(checkInitialPosition, 300);
    
    // Nettoyer les timers
    return () => {
      if (positionTimer) clearTimeout(positionTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.querySelector('.timeline-progress');
      const scrollTop = window.scrollY;

      if (progressBar) {
        if (scrollTop === 0) {
          // Réinitialiser la barre de progression lorsque l'utilisateur est en haut
          progressBar.style.height = '5%';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const forceProgressUpdate = () => {
    const section = document.querySelector('.services-section');
    const progress = document.querySelector('.timeline-progress');
    
    if (section && progress) {
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (sectionRect.top < viewportHeight && sectionRect.bottom > 0) {
        let progressValue;
        
        if (sectionRect.top >= 0) {
          progressValue = 5;
        } else if (sectionRect.bottom <= viewportHeight) {
          progressValue = 100;
        } else {
          const scrolledPast = Math.abs(sectionRect.top);
          const totalToScroll = sectionRect.height - viewportHeight;
          progressValue = Math.min(100, Math.max(5, (scrolledPast / totalToScroll) * 100));
        }
        
        progress.style.height = `${progressValue}%`;
        setProgress(progressValue);
      }
    }
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
        <div className="hero-content">
          <h1>{t?.hero?.slides?.[currentImageIndex]?.title || heroTexts[currentImageIndex].title}</h1>
          <p>{t?.hero?.slides?.[currentImageIndex]?.description || heroTexts[currentImageIndex].description}</p>
          <button className="cta-button">{t?.hero?.cta || "Explorer"}</button>
          <button onClick={() => {
            const servicesSection = document.querySelector('.services-section');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
              // Utiliser une fonction locale qui n'utilise pas setProgress directement
              setTimeout(() => {
                const section = document.querySelector('.services-section');
                const progress = document.querySelector('.timeline-progress');
                if (section && progress) {
                  progress.style.height = '30%'; // Valeur initiale après clic
                  setTimeout(() => window.dispatchEvent(new Event('scroll')), 700);
                }
              }, 500);
            }
          }}>
            Voir notre processus
          </button>
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
        <div className="section-header-animated">
          <h2 className="animated-title">{t?.services?.title || "Nos Services"}</h2>
          <div className="title-underline"></div>
          <p className="animated-subtitle">{t?.services?.subtitle || "Des solutions complètes pour vos besoins"}</p>
        </div>
        <div className="services-cards-container">
          {services.map((service, index) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-circle">
                {service.icon}
              </div>
              <div className="service-content">
                <h3 className="service-title">{t?.services?.list?.[index]?.title || service.title}</h3>
                <p className="service-description">{t?.services?.list?.[index]?.description || service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="services-section process-section">
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          <div className="timeline-progress" style={{ height: `${progress}%` }}></div>
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

      {/* Ajoutez ces éléments décoratifs dans les sections appropriées */}
      <div className="dots-decoration top-right"></div>
      <div className="dots-decoration bottom-left"></div>
      <div className="circle-decoration lg" style={{top: '-200px', right: '-200px'}}></div>
      <div className="circle-decoration sm" style={{bottom: '100px', left: '50px'}}></div>

      {/* Bouton retour en haut */}
      <div className="back-to-top" onClick={handleBackToTop} style={{ display: showBackToTop ? 'block' : 'none' }}>
        <i className="fas fa-arrow-up"></i>
      </div>

      {/* CTA flottant optionnel */}
      <div className="floating-cta visible">
        Nous contacter
      </div>
    </div>
  );
};

export default Home;