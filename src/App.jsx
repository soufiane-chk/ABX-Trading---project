import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/Footer";
import "./styles/home.css"; // Styles pour la page d'accueil
import sardineImg from "./assets/sardine.jpg";
import maquereauImg from "./assets/maquereau.jpg";
import chinchardsImg from "./assets/chinchards.jpg";
import anchoisImg from "./assets/anchois.jpg";
import poulpeImg from "./assets/poulpe.jpg";
import crevetteImg from "./assets/crevette.jpg";
import "./styles/home.css";


const produits = [
  { id: 1, nom: "Sardine", image: sardineImg, prix: "50 DH/kg" },
  { id: 2, nom: "Maquereau", image: maquereauImg, prix: "70 DH/kg" },
  { id: 3, nom: "Chinchards", image: chinchardsImg, prix: "60 DH/kg" },
  { id: 4, nom: "Anchois", image: anchoisImg, prix: "80 DH/kg" },
  { id: 5, nom: "Poulpe", image: poulpeImg, prix: "100 DH/kg" },
  { id: 6, nom: "crevette", image: crevetteImg, prix: "120 DH/kg" },
  

];

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="banner text-center">
          <h1>Bienvenue sur ABX Fish</h1>
          <p>Découvrez nos produits frais et savoureux !</p>
          <button className="btn btn-primary">Explorer</button>
        </section>
        
       {/* categories: */}
        <section className="categories text-center my-5">
          <h2>Nos Catégories</h2>
          <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
            <div className="category-item bg-light p-3 rounded">Poissons frais</div>
            <div className="category-item bg-light p-3 rounded">Céphalopodes</div>
            <div className="category-item bg-light p-3 rounded">Crustacés</div>
            <div className="category-item bg-light p-3 rounded">Conserves</div>
          </div>
        </section>

        {/* Produits Populaires */}
        <h2 className="text-center mb-4">Produits Populaires</h2>
        <section className="container my-5">  
          <div className="row">
            {produits.map((produit) => (
              <div key={produit.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img src={produit.image} className="card-img-top" alt={produit.nom} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{produit.nom}</h5>
                    <p className="card-text font-weight-bold">{produit.prix}</p>
                    <button className="btn btn-primary">Voir Plus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
