import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = {
  products: "http://localhost:4000/products",
  users: "http://localhost:4000/UserDetails",
  cart: "http://localhost:4000/CartItems",
};

const categories = [
  { name: "men's clothing", label: "Men's Fashion", icon: "👕", tone: "mint", description: "Everyday essentials" },
  { name: "women's clothing", label: "Women's Fashion", icon: "👗", tone: "rose", description: "Styles made for you" },
  { name: "electronics", label: "Electronics", icon: "🎧", tone: "blue", description: "Upgrade your tech" },
  { name: "jewelery", label: "Jewelry", icon: "💎", tone: "lavender", description: "Little things that shine" },
];

const formatPrice = (price) =>
  Number(price).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // GET: Load products from JSON Server.
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API.products);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Unable to load products:", err);
      setError("Could not load products. Make sure JSON Server is running at localhost:4000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const title = (product.title || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      const matchesSearch = title.includes(query) || category.includes(query);
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  // POST: Add a product to CartItems. If it already exists, PATCH its quantity.
  const addToCart = async (product) => {
    setCartMessage("");
    try {
      const response = await axios.get(API.cart);
      const cartItems = Array.isArray(response.data) ? response.data : [];
      const existingItem = cartItems.find((item) =>
        String(item.productId ?? "") === String(product.id) ||
        (!item.productId && item.title === product.title)
      );

      if (existingItem) {
        await axios.patch(`${API.cart}/${existingItem.id}`, {
          quantity: Number(existingItem.quantity || 1) + 1,
        });
      } else {
        const cartProduct = {
          ...product,
          productId: product.id,
          quantity: 1,
        };
        delete cartProduct.id;
        await axios.post(API.cart, cartProduct);
      }
      setCartMessage(`${product.title} added to your cart.`);
      window.setTimeout(() => setCartMessage(""), 2600);
    } catch (err) {
      console.error("Unable to update cart:", err);
      setCartMessage("Could not update your cart. Check that JSON Server is running.");
      window.setTimeout(() => setCartMessage(""), 3500);
    }
  };

  return (
    <main className="shopmoree">
      <div className="sm-announcement">
        <span>✦</span> A little something for every you
        <span className="sm-announcement-divider">·</span>
        Discover your next favorite find
      </div>

      <section className="sm-hero">
        <div className="sm-hero-content">
          <span className="sm-eyebrow"><span className="sm-eyebrow-dot" /> YOUR EVERYDAY MARKETPLACE</span>
          <h1>Good finds.<br />Great <span>feeling.</span></h1>
          <p className="sm-hero-copy">
            From everyday essentials to little luxuries, find the things that make your day better.
          </p>
          <div className="sm-hero-actions">
            <button type="button" className="sm-primary-btn" onClick={scrollToProducts}>
              Explore products <span aria-hidden="true">↗</span>
            </button>
            <a href="#categories" className="sm-secondary-btn">Browse categories <span aria-hidden="true">↓</span></a>
          </div>
          <div className="sm-hero-proof">
            <div className="sm-proof-avatars" aria-hidden="true"><span>🛍️</span><span>✨</span><span>💚</span></div>
            <div><strong>Little things, big joy.</strong><small>Find something that feels like you.</small></div>
          </div>
        </div>

        <div className="sm-hero-art" aria-label="ShopMoree featured collection">
          <div className="sm-art-orbit sm-art-orbit-one" />
          <div className="sm-art-orbit sm-art-orbit-two" />
          <div className="sm-art-main">
            <span className="sm-art-sparkle sparkle-one">✳</span>
            <span className="sm-art-sparkle sparkle-two">✦</span>
            <div className="sm-art-bag">🛍️</div>
            <span className="sm-art-caption">A good day<br />starts here.</span>
          </div>
          <div className="sm-art-note sm-art-note-top"><span>✦</span><div><strong>Curated for you</strong><small>Everyday favourites</small></div></div>
          <div className="sm-art-note sm-art-note-bottom"><span className="sm-note-icon">♡</span><div><strong>Find your thing</strong><small>Style · Tech · More</small></div></div>
          <div className="sm-art-sticker">SHOP<br />HAPPY</div>
        </div>
      </section>

      <section className="sm-benefits" aria-label="Shopping benefits">
        <div className="sm-benefit"><span>🚚</span><div><strong>Easy delivery</strong><small>Convenience to your door</small></div></div>
        <div className="sm-benefit"><span>🔒</span><div><strong>Secure shopping</strong><small>Shop with confidence</small></div></div>
        <div className="sm-benefit"><span>♡</span><div><strong>Find your favourites</strong><small>Made for your everyday</small></div></div>
      </section>

      <section className="sm-section" id="categories">
        <div className="sm-section-heading">
          <div><span className="sm-kicker">A LITTLE OF EVERYTHING</span><h2>Shop by category<span>.</span></h2><p>Start with what you love.</p></div>
          <button type="button" className="sm-text-link" onClick={() => { setActiveCategory("All"); scrollToProducts(); }}>View all products <span>↗</span></button>
        </div>
        <div className="sm-category-grid">
          {categories.map((category) => (
            <button type="button" key={category.name}
              className={`sm-category-card ${category.tone} ${activeCategory === category.name ? "is-active" : ""}`}
              onClick={() => { setActiveCategory(category.name); scrollToProducts(); }}>
              <span className="sm-category-icon">{category.icon}</span>
              <span className="sm-category-details"><strong>{category.label}</strong><small>{category.description}</small><em>Explore <span>↗</span></em></span>
              <span className="sm-category-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="sm-promo-row">
        <article className="sm-promo sm-promo-primary">
          <div><span className="sm-promo-kicker">THE JOY OF DISCOVERY</span><h3>Something good<br />is waiting for you.</h3><p>Make room for your next favourite.</p><button type="button" onClick={scrollToProducts}>Find your next find <span>↗</span></button></div>
          <div className="sm-promo-illustration" aria-hidden="true"><span>✦</span><span>🎁</span><i>✳</i></div>
        </article>
        <article className="sm-promo sm-promo-secondary">
          <span className="sm-promo-emoji" aria-hidden="true">✨</span>
          <div><span className="sm-promo-kicker">YOUR STYLE, YOUR WAY</span><h3>Small details.<br />Big personality.</h3><button type="button" onClick={() => { setActiveCategory("jewelery"); scrollToProducts(); }}>Explore jewelry <span>↗</span></button></div>
        </article>
      </section>

      <section className="sm-section sm-products-section" id="products">
        <div className="sm-section-heading sm-products-heading">
          <div><span className="sm-kicker">THE GOOD STUFF</span><h2>{activeCategory === "All" ? "Made for your wishlist" : categories.find((item) => item.name === activeCategory)?.label || "Products"}<span>.</span></h2><p>Lovely finds, all in one place.</p></div>
          <span className="sm-product-count">{filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}</span>
        </div>

        <div className="sm-toolbar">
          <div className="sm-filter-list" role="group" aria-label="Filter products by category">
            <button type="button" className={`sm-filter ${activeCategory === "All" ? "active" : ""}`} onClick={() => setActiveCategory("All")}>Everything</button>
            {categories.map((category) => <button type="button" key={category.name} className={`sm-filter ${activeCategory === category.name ? "active" : ""}`} onClick={() => setActiveCategory(category.name)}>{category.label}</button>)}
          </div>
          <label className="sm-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your next find..." aria-label="Search products" />{search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>}</label>
        </div>

        {cartMessage && <div className="sm-cart-message" role="status">{cartMessage}</div>}

        {loading ? (
          <div className="sm-empty"><span className="sm-loading-spinner" /><h3>Finding your favourites...</h3><p>Loading products from ShopMoree.</p></div>
        ) : error ? (
          <div className="sm-empty"><span>⚠</span><h3>Products couldn't load</h3><p>{error}</p><button type="button" className="sm-primary-btn" onClick={fetchProducts}>Try again <span>↻</span></button></div>
        ) : filteredProducts.length > 0 ? (
          <div className="sm-product-grid">
            {filteredProducts.map((product) => (
              <article className="sm-product-card" key={product.id}>
                <div className="sm-product-image">
                  <img src={product.image} alt={product.title} loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
                  <span className="sm-product-tag">{Number(product.rating?.rate) >= 4.5 ? "Customer favourite" : "Nice find"}</span>
                  <button type="button" className={`sm-favorite-button ${favorites.includes(product.id) ? "selected" : ""}`} aria-label={favorites.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={favorites.includes(product.id)} onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? "♥" : "♡"}</button>
                </div>
                <div className="sm-product-info">
                  <span className="sm-product-category">{product.category || "Everyday find"}</span>
                  <h3 title={product.title}>{product.title}</h3>
                  <div className="sm-product-rating"><span>★</span><strong>{product.rating?.rate ?? "New"}</strong>{product.rating?.count != null && <small>({product.rating.count} reviews)</small>}</div>
                  <div className="sm-product-bottom"><strong className="sm-price">{formatPrice(product.price)}</strong><button type="button" className="sm-add-btn" aria-label={`Add ${product.title} to cart`} onClick={() => addToCart(product)}><span>+</span><small>Add</small></button></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="sm-empty"><span>⌕</span><h3>No finds just yet</h3><p>Try another search or category. Your next favourite might be one click away.</p><button type="button" className="sm-primary-btn" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear filters <span>↗</span></button></div>
        )}
      </section>

      <footer className="sm-footer" id="about">
        <a href="/" className="sm-logo" aria-label="ShopMoree home"><span className="sm-logo-mark">s.</span><span>shopmoree<span className="sm-logo-period">.</span></span></a>
        <p>Discover more. Shop a little happier.</p>
        <span className="sm-footer-copy">© {new Date().getFullYear()} ShopMoree. Made for your everyday.</span>
      </footer>
    </main>
  );
};

export default Home;
