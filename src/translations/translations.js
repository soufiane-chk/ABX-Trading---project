import imgcong from "../assets/imgcong.jpg";
import imgval from "../assets/imgemba1.jpg";
import imgcond from "../assets/imgsupp3.png";

export const translations = {
  FR: {
    nav: {
      home: "Accueil",
      products: "Produits",
      contact: "Contact",
      search: "Rechercher"
    },
    hero: {
      slides: [
        { title: "ABXTRADING", description: "ABXTRADING est un groupe marocain de premier plan, spécialisé dans l'exportation de poissons et de fruits de mer frais et vivants." },
        { title: "Qualité Supérieure", description: "Nous nous engageons à fournir des produits marins de qualité supérieure, tout en respectant les normes les plus strictes en matière de durabilité et de sécurité alimentaire." },
        { title: "Engagement et Durabilité", description: "Notre engagement envers la durabilité et la sécurité alimentaire est au cœur de notre mission, garantissant des produits de la mer de la plus haute qualité." }
      ],
      cta: "Explorer"
    },
    services: {
      title: "Nos Services",
      subtitle: "Des solutions complètes pour vos besoins",
      list: [
        {
          title: "Exportation de poissons et fruits de mer frais et vivants",
          description:
            "Grâce à notre réseau mondial, nous assurons des livraisons fiables et ponctuelles de poissons et fruits de mer frais vivants et congelés, adaptés aux besoins des marchés internationaux.",
          image: imgcong, // Utilisez la variable importée
        },
        {
          title: "Traitement et emballage adaptés",
          description:
            "Nous offrons un service de traitement, de nettoyage et d’emballage de vos produits marins en conformité avec les normes internationales, garantissant ainsi leur fraîcheur et leur qualité jusqu'à leur arrivée.",
          image: imgval, // Utilisez la variable importée
        },
        {
          title: "Support client dédié",
          description:
            "Notre équipe expérimentée est à votre disposition pour vous fournir un accompagnement personnalisé tout au long du processus, depuis la commande jusqu’à la livraison. Nous nous engageons à répondre à vos besoins et à garantir une expérience client optimale.",
          image: imgcond, // Utilisez la variable importée
        },
      ],
    },
    process: {
      title: "Notre Processus de Production",
      subtitle: "Une approche rigoureuse pour garantir la qualité de nos produits",
      steps: [
        { title: "Sélection des Produits", description: "Nos produits sont soigneusement sélectionnés par nos experts en fonction de leur fraîcheur, leur taille et leur qualité. Nous établissons des partenariats solides avec une expérience de 20 ans" },
        { title: "Contrôle de la Qualité", description: "Chaque produit subit un contrôle qualité rigoureux. Nous vérifions la fraîcheur, l'aspect, l'odeur et la texture des poissons et fruits de mer. Notre processus de contrôle de qualité est conforme aux normes de sécurité alimentaire internationales." },
        { title: "Emballage et Expédition", description: "Après avoir été triés et préparés, les produits sont emballés dans des conditions optimales pour garantir leur fraîcheur. Nous utilisons des techniques d'emballage adaptées aux produits vivants et frais ou congelés, en veillant à maintenir une température constante pendant le transport." },
        { title: "Suivi et Livraison", description: "Grâce à notre partenariat avec des transporteurs de confiance, nous assurons un suivi constant de chaque expédition. Vous pouvez suivre l'acheminement de vos produits en temps réel et être assuré qu'ils arrivent dans des conditions optimales." }
      ]
    },
    whyUs: {
      title: "Pourquoi Nous Choisir",
      subtitle: "Des engagements forts pour votre satisfaction",
      reasons: [
        { title: "Traçabilité et transparence", description: "ABXTRADING offre une traçabilité totale de chaque produit, garantissant que vous puissiez suivre l’origine et le parcours de chaque lot de manière transparente." },
        { title: "Délais de livraison garantis", description: "Nous savons à quel point la ponctualité est cruciale. Nous assurons des délais de livraison respectés grâce à une gestion efficace de nos flux logistiques." },
        { title: "Partenaire de confiance", description: "Avec ABXTRADING, vous bénéficiez d'un partenaire fiable, capable de fournir des solutions de qualité adaptées aux exigences spécifiques de vos marchés. Nous privilégions une relation de long terme fondée sur la confiance et l'excellence." }
      ]
    },
    products: {
      title: "Nos Produits",
      description: "Découvrez notre sélection de produits de la mer de première qualité",
      searchPlaceholder: "Rechercher un produit...",
      categories: ['Tous', 'Poissons Pélagiques', 'Céphalopodes'],
      detailsButton: "Voir détails",
      orderButton: "Commander",
      items: [
        { id: 1, nom: "Poulpe", prix: "100 DH/kg", category: "Céphalopodes", imageKey: "poulpe" },
        { id: 2, nom: "Calamar", category: "Céphalopodes", imageKey: "calamar" },
        { id: 3, nom: "Seiche", category: "Céphalopodes", imageKey: "seiche" },
        { id: 4, nom: "Mongo", category: "Céphalopodes", imageKey: "mongo" },
        { id: 5, nom: "Almendrita", category: "Poissons Pélagiques", imageKey: "almendrita" },
        { id: 6, nom: "Puntilla", category: "Céphalopodes", imageKey: "puntilla" },
        { id: 7, nom: "Sardine", category: "Poissons Pélagiques", imageKey: "sardine" },
        { id: 8, nom: "Maquereau", category: "Poissons Pélagiques", imageKey: "maquereau" },
        { id: 9, nom: "Sabre", category: "Poissons Pélagiques", imageKey: "sabre" },
      ]
    },
    orderForm: {
      title: "Commander",
      quantityLabel: "Quantité (kg)",
      nameLabel: "Nom",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      submitButton: "Envoyer",
      cancelButton: "Annuler"
    },
    contact: {
      title: "Contactez-Nous",
      subtitle: "Notre équipe est là pour répondre à toutes vos questions",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse",
      hours: "Heures d'ouverture",
      openingHours: {
        weekdays: "Lun - Ven: 9h - 18h",
        saturday: "Sam: 9h - 13h"
      },
      sendMessage: "Envoyez-nous un message",
      name: "Votre nom",
      phonePlaceholder: "Votre Téléphone",
      emailPlaceholder: "Votre e-mail",
      subject: "Objet",
      message: "Votre message (facultatif)",
      send: "Envoyer",
      location: "Notre Localisation",
      mapAddress: "Adresse: LOT 28 31 ROUTE JERF LIHOUDI ZONE INDUSTRIEL - SAFI",
      messageSent: "Votre message a été envoyé avec succès!"
    },
    
    footer: {
      rights: "Tous droits réservés."
    }
  },
  EN: {
    nav: {
      home: "Home",
      products: "Products",
      contact: "Contact",
      search: "Search"
    },
    hero: {
      slides: [
        { title: "ABXTRADING", description: "ABXTRADING is a leading Moroccan group specializing in the export of fresh and live seafood." },
        { title: "Superior Quality", description: "We are committed to providing high-quality seafood products while adhering to the strictest sustainability and food safety standards." },
        { title: "Commitment and Sustainability", description: "Our commitment to sustainability and food safety is at the heart of our mission, ensuring the highest quality seafood products." }
      ],
      cta: "Explore"
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive solutions for your needs",
      list: [
        {
          title: "Export of fresh and live seafood",
          description:
            "Thanks to our global network, we ensure reliable and timely deliveries of fresh, live, and frozen seafood tailored to international market needs.",
        },
        {
          title: "Tailored processing and packaging",
          description:
            "We offer processing, cleaning, and packaging services for your seafood products in compliance with international standards, ensuring their freshness and quality until arrival.",
        },
        {
          title: "Dedicated customer support",
          description:
            "Our experienced team is here to provide personalized support throughout the process, from order to delivery, ensuring an optimal customer experience.",
        },
      ],
    },
    process: {
      title: "Our Production Process",
      subtitle: "A rigorous approach to ensure the quality of our products",
      steps: [
        { title: "Product Selection", description: "Our products are carefully selected by our experts based on their freshness, size, and quality. We establish strong partnerships with 20 years of experience." },
        { title: "Quality Control", description: "Each product undergoes rigorous quality control. We check the freshness, appearance, smell, and texture of the seafood. Our quality control process complies with international food safety standards." },
        { title: "Packaging and Shipping", description: "After being sorted and prepared, the products are packaged under optimal conditions to ensure their freshness. We use packaging techniques suitable for live and fresh or frozen products, ensuring a constant temperature during transport." },
        { title: "Tracking and Delivery", description: "Thanks to our partnership with trusted carriers, we ensure constant tracking of each shipment. You can track the progress of your products in real-time and be assured that they arrive in optimal conditions." }
      ]
    },
    whyUs: {
      title: "Why Choose Us",
      subtitle: "Strong commitments for your satisfaction",
      reasons: [
        { title: "Traceability and transparency", description: "ABXTRADING offers complete traceability of each product, ensuring that you can track the origin and journey of each batch transparently." },
        { title: "Guaranteed delivery times", description: "We know how crucial punctuality is. We ensure respected delivery times thanks to efficient management of our logistics flows." },
        { title: "Trusted partner", description: "With ABXTRADING, you benefit from a reliable partner capable of providing quality solutions tailored to the specific requirements of your markets. We prioritize a long-term relationship based on trust and excellence." }
      ]
    },
    products: {
      title: "Our Products",
      description: "Discover our selection of premium seafood products",
      searchPlaceholder: "Search for a product...",
      categories: ['All', 'Pelagic Fish', 'Cephalopods'],
      detailsButton: "View Details",
      orderButton: "Order",
      items: [
        { id: 1, nom: "Octopus", prix: "100 DH/kg", category: "Cephalopods", imageKey: "poulpe" },
        { id: 2, nom: "Squid", prix: "120 DH/kg", category: "Cephalopods", imageKey: "calamar" },
        { id: 3, nom: "Cuttlefish", prix: "110 DH/kg", category: "Cephalopods", imageKey: "seiche" },
        { id: 4, nom: "Mongo", prix: "130 DH/kg", category: "Cephalopods", imageKey: "mongo" },
        { id: 5, nom: "Almendrita", prix: "140 DH/kg", category: "Pelagic Fish", imageKey: "almendrita" },
        { id: 6, nom: "Puntilla", prix: "150 DH/kg", category: "Cephalopods", imageKey: "puntilla" },
        { id: 7, nom: "Sardine", prix: "50 DH/kg", category: "Pelagic Fish", imageKey: "sardine" },
        { id: 8, nom: "Mackerel", prix: "70 DH/kg", category: "Pelagic Fish", imageKey: "maquereau" },
        { id: 9, nom: "Sabre", prix: "80 DH/kg", category: "Pelagic Fish", imageKey: "sabre" },
      ]
    },
    orderForm: {
      title: "Order",
      quantityLabel: "Quantity (kg)",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      submitButton: "Submit",
      cancelButton: "Cancel"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Our team is here to answer all your questions",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Opening Hours",
      openingHours: {
        weekdays: "Mon - Fri: 9 AM - 6 PM",
        saturday: "Sat: 9 AM - 1 PM"
      },
      sendMessage: "Send us a message",
      name: "Your Name",
      phonePlaceholder: "Your Phone",
      emailPlaceholder: "Your Email",
      subject: "Subject",
      message: "Your Message (optional)",
      send: "Send",
      location: "Our Location",
      mapAddress: "Address: LOT 28 31 ROUTE JERF LIHOUDI INDUSTRIAL ZONE - SAFI",
      messageSent: "Your message has been sent successfully!"
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  ES: {
    nav: {
      home: "Inicio",
      products: "Productos",
      contact: "Contacto",
      search: "Buscar"
    },
    hero: {
      slides: [
        { title: "ABXTRADING", description: "ABXTRADING es un grupo marroquí líder especializado en la exportación de mariscos frescos y vivos." },
        { title: "Calidad Superior", description: "Nos comprometemos a proporcionar productos marinos de alta calidad, respetando los estándares más estrictos de sostenibilidad y seguridad alimentaria." },
        { title: "Compromiso y Sostenibilidad", description: "Nuestro compromiso con la sostenibilidad y la seguridad alimentaria está en el corazón de nuestra misión, garantizando productos marinos de la más alta calidad." }
      ],
      cta: "Explorar"
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales para sus necesidades",
      list: [
        { title: "Exportación de mariscos frescos y vivos", description: "Gracias a nuestra red global, aseguramos entregas confiables y puntuales de mariscos frescos y vivos, adaptados a las necesidades de los mercados internacionales." },
        { title: "Procesamiento y embalaje a medida", description: "Ofrecemos un servicio de procesamiento, limpieza y embalaje de sus productos marinos en cumplimiento con los estándares internacionales, garantizando su frescura y calidad hasta su llegada." },
        { title: "Soporte al cliente dedicado", description: "Nuestro equipo experimentado está a su disposición para proporcionar un soporte personalizado durante todo el proceso, desde el pedido hasta la entrega. Nos comprometemos a satisfacer sus necesidades y garantizar una experiencia óptima para el cliente." }
      ]
    },
    process: {
      title: "Nuestro Proceso de Producción",
      subtitle: "Un enfoque riguroso para garantizar la calidad de nuestros productos",
      steps: [
        { title: "Selección de Productos", description: "Nuestros productos son cuidadosamente seleccionados por nuestros expertos en función de su frescura, tamaño y calidad. Establecemos asociaciones sólidas con 20 años de experiencia." },
        { title: "Control de Calidad", description: "Cada producto pasa por un riguroso control de calidad. Verificamos la frescura, apariencia, olor y textura de los mariscos. Nuestro proceso de control de calidad cumple con las normas internacionales de seguridad alimentaria." },
        { title: "Embalaje y Envío", description: "Después de ser clasificados y preparados, los productos se embalan en condiciones óptimas para garantizar su frescura. Utilizamos técnicas de embalaje adecuadas para productos vivos y frescos o congelados, asegurando una temperatura constante durante el transporte." },
        { title: "Seguimiento y Entrega", description: "Gracias a nuestra asociación con transportistas de confianza, aseguramos un seguimiento constante de cada envío. Puede seguir el progreso de sus productos en tiempo real y estar seguro de que llegan en condiciones óptimas." }
      ]
    },
    whyUs: {
      title: "Por Qué Elegirnos",
      subtitle: "Compromisos fuertes para su satisfacción",
      reasons: [
        { title: "Trazabilidad y transparencia", description: "ABXTRADING ofrece una trazabilidad completa de cada producto, asegurando que pueda seguir el origen y el recorrido de cada lote de manera transparente." },
        { title: "Tiempos de entrega garantizados", description: "Sabemos lo crucial que es la puntualidad. Aseguramos tiempos de entrega respetados gracias a una gestión eficiente de nuestros flujos logísticos." },
        { title: "Socio de confianza", description: "Con ABXTRADING, se beneficia de un socio confiable, capaz de proporcionar soluciones de calidad adaptadas a los requisitos específicos de sus mercados. Priorizamos una relación a largo plazo basada en la confianza y la excelencia." }
      ]
    },
    products: {
      title: "Nuestros Productos",
      description: "Descubre nuestra selección de productos del mar de primera calidad",
      searchPlaceholder: "Buscar un producto...",
      categories: ['Todos', 'Peces Pelágicos', 'Cefalópodos'],
      detailsButton: "Ver detalles",
      orderButton: "Ordenar",
      items: [
        { id: 1, nom: "Pulpo", prix: "100 DH/kg", category: "Cefalópodos", imageKey: "poulpe" },
        { id: 2, nom: "Calamar", prix: "120 DH/kg", category: "Cefalópodos", imageKey: "calamar" },
        { id: 3, nom: "Sepia", prix: "110 DH/kg", category: "Cefalópodos", imageKey: "seiche" },
        { id: 4, nom: "Mongo", prix: "130 DH/kg", category: "Cefalópodos", imageKey: "mongo" },
        { id: 5, nom: "Almendrita", prix: "140 DH/kg", category: "Peces Pelágicos", imageKey: "almendrita" },
        { id: 6, nom: "Puntilla", prix: "150 DH/kg", category: "Cefalópodos", imageKey: "puntilla" },
        { id: 7, nom: "Sardina", prix: "50 DH/kg", category: "Peces Pelágicos", imageKey: "sardine" },
        { id: 8, nom: "Caballa", prix: "70 DH/kg", category: "Peces Pelágicos", imageKey: "maquereau" },
        { id: 9, nom: "Sabre", prix: "80 DH/kg", category: "Peces Pelágicos", imageKey: "sabre" },
      ]
    },
    orderForm: {
      title: "Ordenar",
      quantityLabel: "Cantidad (kg)",
      nameLabel: "Nombre",
      emailLabel: "Correo electrónico",
      phoneLabel: "Teléfono",
      submitButton: "Enviar",
      cancelButton: "Cancelar"
    },
    contact: {
      title: "Contáctenos",
      subtitle: "Nuestro equipo está aquí para responder todas sus preguntas",
      phone: "Teléfono",
      email: "Correo electrónico",
      address: "Dirección",
      hours: "Horario de atención",
      openingHours: {
        weekdays: "Lun - Vie: 9 AM - 6 PM",
        saturday: "Sáb: 9 AM - 1 PM"
      },
      sendMessage: "Envíenos un mensaje",
      name: "Su Nombre",
      phonePlaceholder: "Su Teléfono",
      emailPlaceholder: "Su Correo Electrónico",
      subject: "Asunto",
      message: "Su Mensaje (opcional)",
      send: "Enviar",
      location: "Nuestra Ubicación",
      mapAddress: "Dirección: LOT 28 31 ROUTE JERF LIHOUDI ZONA INDUSTRIAL - SAFI",
      messageSent: "¡Su mensaje ha sido enviado con éxito!"
    },
    footer: {
      rights: "Todos los derechos reservados."
    }
  },
  PT: {
    nav: {
      home: "Início",
      products: "Produtos",
      contact: "Contato",
      search: "Pesquisar"
    },
    hero: {
      slides: [
        { title: "ABXTRADING", description: "ABXTRADING é um grupo marroquino líder especializado na exportação de mariscos frescos e vivos." },
        { title: "Qualidade Superior", description: "Estamos comprometidos em fornecer produtos marinhos de alta qualidade, respeitando os padrões mais rigorosos de sustentabilidade e segurança alimentar." },
        { title: "Compromisso e Sustentabilidade", description: "Nosso compromisso com a sustentabilidade e a segurança alimentar está no coração de nossa missão, garantindo produtos marinhos da mais alta qualidade." }
      ],
      cta: "Explorar"
    },
    services: {
      title: "Nossos Serviços",
      subtitle: "Soluções abrangentes para suas necessidades",
      list: [
        { title: "Exportação de mariscos frescos e vivos", description: "Graças à nossa rede global, garantimos entregas confiáveis e pontuais de mariscos frescos e vivos, adaptados às necessidades dos mercados internacionais." },
        { title: "Processamento e embalagem sob medida", description: "Oferecemos um serviço de processamento, limpeza e embalagem de seus produtos marinhos em conformidade com os padrões internacionais, garantindo sua frescura e qualidade até a chegada." },
        { title: "Suporte ao cliente dedicado", description: "Nossa equipe experiente está à sua disposição para fornecer suporte personalizado durante todo o processo, desde o pedido até a entrega. Estamos comprometidos em atender às suas necessidades e garantir uma experiência ótima para o cliente." }
      ]
    },
    process: {
      title: "Nosso Processo de Produção",
      subtitle: "Uma abordagem rigorosa para garantir a qualidade de nossos produtos",
      steps: [
        { title: "Seleção de Produtos", description: "Nossos produtos são cuidadosamente selecionados por nossos especialistas com base em sua frescura, tamanho e qualidade. Estabelecemos parcerias sólidas com 20 anos de experiência." },
        { title: "Controle de Qualidade", description: "Cada produto passa por um rigoroso controle de qualidade. Verificamos a frescura, aparência, cheiro e textura dos mariscos. Nosso processo de controle de qualidade está em conformidade com os padrões internacionais de segurança alimentar." },
        { title: "Embalagem e Expedição", description: "Depois de serem classificados e preparados, os produtos são embalados em condições ideais para garantir sua frescura. Utilizamos técnicas de embalagem adequadas para produtos vivos e frescos ou congelados, garantindo uma temperatura constante durante o transporte." },
        { title: "Acompanhamento e Entrega", description: "Graças à nossa parceria com transportadoras de confiança, garantimos um acompanhamento constante de cada envio. Você pode acompanhar o progresso de seus produtos em tempo real e ter a certeza de que eles chegam em condições ideais." }
      ]
    },
    whyUs: {
      title: "Por Que Nos Escolher",
      subtitle: "Compromissos fortes para sua satisfação",
      reasons: [
        { title: "Rastreabilidade e transparência", description: "ABXTRADING oferece rastreabilidade completa de cada produto, garantindo que você possa acompanhar a origem e o percurso de cada lote de forma transparente." },
        { title: "Prazos de entrega garantidos", description: "Sabemos o quão crucial é a pontualidade. Garantimos prazos de entrega respeitados graças à gestão eficiente de nossos fluxos logísticos." },
        { title: "Parceiro de confiança", description: "Com a ABXTRADING, você se beneficia de um parceiro confiável, capaz de fornecer soluções de qualidade adaptadas às exigências específicas de seus mercados. Priorizamos um relacionamento de longo prazo baseado na confiança e na excelência." }
      ]
    },
    products: {
      title: "Nossos Produtos",
      description: "Descubra nossa seleção de produtos do mar de primeira qualidade",
      searchPlaceholder: "Pesquisar um produto...",
      categories: ['Todos', 'Peixes Pelágicos', 'Cefalópodes'],
      detailsButton: "Ver detalhes",
      orderButton: "Encomendar",
      items: [
        { id: 1, nom: "Polvo", prix: "100 DH/kg", category: "Cefalópodes", imageKey: "poulpe" },
        { id: 2, nom: "Lula", prix: "120 DH/kg", category: "Cefalópodes", imageKey: "calamar" },
        { id: 3, nom: "Choco", prix: "110 DH/kg", category: "Cefalópodes", imageKey: "seiche" },
        { id: 4, nom: "Mongo", prix: "130 DH/kg", category: "Cefalópodes", imageKey: "mongo" },
        { id: 5, nom: "Almendrita", prix: "140 DH/kg", category: "Peixes", imageKey: "almendrita" },
        { id: 6, nom: "Puntilla", prix: "150 DH/kg", category: "Cefalópodes", imageKey: "puntilla" },
        { id: 7, nom: "Sardinha", prix: "50 DH/kg", category: "Peixes Pelágicos", imageKey: "sardine" },
        { id: 8, nom: "Cavala", prix: "70 DH/kg", category: "Peixes Pelágicos", imageKey: "maquereau" },
        { id: 9, nom: "Sabre", prix: "80 DH/kg", category: "Peixes", imageKey: "sabre" },
      ]
    },
    orderForm: {
      title: "Encomendar",
      quantityLabel: "Quantidade (kg)",
      nameLabel: "Nome",
      emailLabel: "Email",
      phoneLabel: "Telefone",
      submitButton: "Enviar",
      cancelButton: "Cancelar"
    },
    contact: {
      title: "Contate-Nos",
      subtitle: "Nossa equipe está aqui para responder todas as suas perguntas",
      phone: "Telefone",
      email: "E-mail",
      address: "Endereço",
      hours: "Horário de funcionamento",
      openingHours: {
        weekdays: "Seg - Sex: 9h - 18h",
        saturday: "Sáb: 9h - 13h"
      },
      sendMessage: "Envie-nos uma mensagem",
      name: "Seu Nome",
      phonePlaceholder: "Seu Telefone",
      emailPlaceholder: "Seu E-mail",
      subject: "Assunto",
      message: "Sua Mensagem (opcional)",
      send: "Enviar",
      location: "Nossa Localização",
      mapAddress: "Endereço: LOT 28 31 ROUTE JERF LIHOUDI ZONA INDUSTRIAL - SAFI",
      messageSent: "Sua mensagem foi enviada com sucesso!"
    },
    footer: {
      rights: "Todos os direitos reservados."
    }
  }
};