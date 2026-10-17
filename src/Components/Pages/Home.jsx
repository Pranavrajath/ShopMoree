
import React, { useMemo, useState } from "react";

const categories = [
  { name: "men's clothing", label: "Men's Fashion", icon: "👕", tone: "mint" },
  { name: "women's clothing", label: "Women's Fashion", icon: "👗", tone: "pink" },
  { name: "electronics", label: "Electronics", icon: "🎧", tone: "blue" },
  { name: "jewelery", label: "Jewelry", icon: "💎", tone: "lavender" },
];

const Home = ({ products = [], onAddToCart = () => {} }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  return (
    <main className="shopmoree">

      {/* Hero */}
      <section className="sm-hero">
        <div className="sm-hero-content">
          <span className="sm-eyebrow">
            ✦ NEW COLLECTION
          </span>

          <h1>
            Discover <span>More</span>
            <br />
            Every day.
          </h1>

          <p>
            Shop the latest trends in fashion, electronics,
            home essentials and more — all in one place.
          </p>

          <div className="sm-hero-actions">
            <a href="#products" className="sm-primary-btn">
              Shop Now <span>→</span>
            </a>

            <a href="#categories" className="sm-secondary-btn">
              Explore Categories
            </a>
          </div>

          <div className="sm-trust">
            <div className="sm-trust-item">
              <span className="sm-trust-icon">🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <small>On orders above ₹499</small>
              </div>
            </div>

            <div className="sm-trust-item">
              <span className="sm-trust-icon">🛡️</span>
              <div>
                <strong>Secure Payment</strong>
                <small>Shop with confidence</small>
              </div>
            </div>

            <div className="sm-trust-item">
              <span className="sm-trust-icon">♧</span>
              <div>
                <strong>Customer Support</strong>
                <small>We're here to help</small>
              </div>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="sm-hero-visual">
          <div className="sm-hero-circle" />

          <div className="sm-offer-card">
            <span className="sm-offer-icon">🎁</span>
            <div>
              <small>Discover great deals</small>
              <strong>Special Finds</strong>
              <span>Explore the collection</span>
            </div>
          </div>

          <div className="sm-showcase">
            <div className="sm-showcase-item sm-showcase-large">
              <span>🎧</span>
            </div>
            <div className="sm-showcase-item sm-showcase-green">
              <span>👜</span>
            </div>
            <div className="sm-showcase-item sm-showcase-small">
              <span>⌚</span>
            </div>
            <div className="sm-showcase-item sm-showcase-shoe">
              <span>👟</span>
            </div>
          </div>

          <div className="sm-floating-card">
            <span>✦</span>
            Find something you love
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sm-section" id="categories">
        <div className="sm-section-heading">
          <div>
            <h2>Shop by Category</h2>
            <p>Explore our wide range of products.</p>
          </div>

          <a href="#products" className="sm-view-all">
            View All →
          </a>
        </div>

        <div className="sm-category-grid">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`sm-category-card ${category.tone}`}
              onClick={() => {
                setActiveCategory(category.name);
                document.getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="sm-category-icon">
                {category.icon}
              </span>

              <span className="sm-category-details">
                <strong>{category.label}</strong>
                <small>Shop Now →</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Promotional banners */}
      <section className="sm-deals" id="deals">
        <article className="sm-deal-banner sm-deal-main">
          <span className="sm-deal-label">DISCOVER SOMETHING NEW</span>
          <h2>Great Finds.<br />Better Choices.</h2>
          <p>Your next favorite product is waiting.</p>
          <a href="#products">Explore Deals →</a>
          <span className="sm-deal-decoration">%</span>
        </article>

        <article className="sm-deal-banner sm-deal-light">
          <span className="sm-deal-emoji">👕</span>
          <div>
            <span className="sm-deal-label">FRESH STYLES</span>
            <h3>New Arrivals</h3>
            <p>Find your everyday favorites.</p>
            <a href="#products">Shop Now →</a>
          </div>
        </article>

        <article className="sm-deal-banner sm-deal-blue">
          <span className="sm-deal-emoji">🎧</span>
          <div>
            <span className="sm-deal-label">TECH PICKS</span>
            <h3>Top Electronics</h3>
            <p>Explore your next upgrade.</p>
            <a href="#products">Shop Now →</a>
          </div>
        </article>
      </section>

      {/* Best sellers / product grid */}
      <section className="sm-section sm-products-section" id="products">
        <div className="sm-section-heading">
          <div>
            <h2>
              {activeCategory === "All"
                ? "Best Sellers"
                : categories.find(
                    (category) => category.name === activeCategory
                  )?.label || "Products"}
            </h2>
            <p>Discover products you'll love.</p>
          </div>

          <span className="sm-product-count">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="sm-toolbar">
          <div className="sm-filter-list">
            <button
              className={activeCategory === "All" ? "sm-filter active" : "sm-filter"}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  activeCategory === category.name
                    ? "sm-filter active"
                    : "sm-filter"
                }
                onClick={() => setActiveCategory(category.name)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="sm-product-grid">
            {filteredProducts.map((product) => (
              <article className="sm-product-card" key={product.id}>
                <div className="sm-product-image">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                  />

                  <button
                    className={
                      favorites.includes(product.id)
                        ? "sm-favorite-button selected"
                        : "sm-favorite-button"
                    }
                    aria-label={
                      favorites.includes(product.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>

                  <span className="sm-product-tag">Discover</span>
                </div>

                <div className="sm-product-info">
                  <span className="sm-product-category">
                    {product.category}
                  </span>

                  <h3 title={product.title}>
                    {product.title}
                  </h3>

                  <div className="sm-product-rating">
                    <span>★</span>
                    {product.rating?.rate ?? "New"}
                    {product.rating?.count != null && (
                      <small>({product.rating.count})</small>
                    )}
                  </div>

                  <div className="sm-product-bottom">
                    <strong>{formatPrice(product.price)}</strong>

                    <button
                      className="sm-add-btn"
                      aria-label={`Add ${product.title} to cart`}
                      onClick={() => onAddToCart(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="sm-empty">
            <span>🔎</span>
            <h3>No products found</h3>
            <p>Try another search or category.</p>

            <button
              className="sm-primary-btn"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="sm-footer" id="about">
        <a href="/" className="sm-logo">
          <span className="sm-logo-icon">▣</span>
          Shop<span>Moree</span>
        </a>

        <p>Discover more. Shop smarter.</p>

        <span>
          © {new Date().getFullYear()} ShopMoree. All rights reserved.
        </span>
      </footer>
    </main>
  );
};

export default Home;
