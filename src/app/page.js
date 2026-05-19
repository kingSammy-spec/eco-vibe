'use client';
import { useState } from 'react';
import './globals.css';

const CATEGORIES = ["Sustainability", "Zero Waste", "Clean Energy", "Conservation", "Eco Tech"];

const POSTS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  tag: CATEGORIES[i % CATEGORIES.length],
  title: `${["Green", "Sustainable", "Eco", "Renewable", "Natural"][i % 5]} ${["Living", "Future", "Solutions", "Design", "Habits"][i % 5]} #${i + 1}`,
  excerpt: "Discover practical ways to reduce your carbon footprint and live in harmony with nature. Our latest guide explores innovative methods for everyday sustainability.",
  content: `Welcome to Eco Vibe's deep dive into sustainable practices. This article breaks down everything you need to know about ${CATEGORIES[i % CATEGORIES.length].toLowerCase()} in the modern era.\n\nImplementing these changes doesn't have to be overwhelming. By taking small, actionable steps every day, you can drastically reduce waste and promote a healthier environment for future generations.\n\n"The easiest step is simply being aware of your daily choices," says our lead environmental scientist. "From the products you buy to the energy you consume, every decision matters."\n\nJoin the discussion in the community section below and let us know how you're making an impact!`,
  author: ["Maya Green", "Leo Rivers", "Sam Earth", "Nina Forest"][i % 4],
  time: `${(i % 12) + 1} hours ago`,
  image: `https://picsum.photos/seed/eco${i + 1}/500/300`
}));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adsDisabled, setAdsDisabled] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingPost, setPendingPost] = useState(null);
  const [showFloatingAd, setShowFloatingAd] = useState(true);
  const itemsPerPage = 15;

  const handlePostClick = (post) => {
    if (adsDisabled) {
      setSelectedPost(post);
    } else {
      setPendingPost(post);
      setShowInterstitial(true);
      setTimeout(() => {
        setShowInterstitial(false);
        setSelectedPost(post);
        setPendingPost(null);
      }, 5000);
    }
  };

  const filtered = POSTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <header>
        <div className="logo" onClick={() => setActiveCategory('All')} style={{cursor: 'pointer'}}>Eco Vibe</div>
        <button className="burger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#" className={activeCategory === 'All' ? 'active' : ''} style={{color: activeCategory === 'All' ? 'var(--primary)' : ''}} onClick={(e) => {e.preventDefault(); setActiveCategory('All'); setCurrentPage(1); setIsMobileMenuOpen(false);}}>Home</a>
          {CATEGORIES.slice(0,4).map(cat => (
            <a key={cat} href="#" className={activeCategory === cat ? 'active' : ''} style={{color: activeCategory === cat ? 'var(--primary)' : ''}} onClick={(e) => {e.preventDefault(); setActiveCategory(cat); setCurrentPage(1); setIsMobileMenuOpen(false);}}>{cat}</a>
          ))}
        </nav>
      </header>

      <section className="hero">
        <h1>Breathe in the <br/><span style={{color: 'var(--primary)'}}>Future.</span></h1>
        <div className="search-wrap" style={{marginTop: '2rem'}}>
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search 150+ eco articles..." 
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
          />
        </div>
      </section>

      <main className="post-list">
        {displayed.map((post, index) => (
          <div key={`post-group-${post.id}`} style={{ display: 'contents' }}>
            <article className="post-card" onClick={() => handlePostClick(post)} style={{cursor: 'pointer'}}>
              <img src={post.image} alt={post.title} style={{width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem'}} />
              <span className="tag">{post.tag}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="meta">
                <span>By {post.author}</span> • <span>{post.time}</span>
              </div>
            </article>

            {!adsDisabled && (index + 1) % 6 === 0 && (
              <div key={`ad-${post.id}`} className="eco-ad-bar">
                <span className="ad-label">ECO SPONSOR</span>
                <div className="ad-content">Shop 100% Recycled & Organic Fashion Brands Today.</div>
              </div>
            )}
          </div>
        ))}
      </main>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1); window.scrollTo(0,0);}}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(p => p + 1); window.scrollTo(0,0);}}>Next</button>
        </div>
      )}

      {/* Reader Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(249, 251, 249, 0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{background: '#fff', padding: '3rem', borderRadius: '24px', maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative'}}>
            <button onClick={() => setSelectedPost(null)} style={{position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f3f4f6', border: 'none', color: '#333', fontSize: '1.5rem', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>&times;</button>
            <span className="tag">{selectedPost.tag}</span>
            <h2 style={{fontFamily: 'Lora, serif', fontSize: '2.5rem', color: '#166534', margin: '1.5rem 0 1rem'}}>{selectedPost.title}</h2>
            <div className="meta" style={{marginBottom: '2rem'}}>Written by <strong>{selectedPost.author}</strong> • {selectedPost.time}</div>
            <img src={selectedPost.image} alt={selectedPost.title} style={{width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem'}} />
            <div style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563', whiteSpace: 'pre-wrap'}}>{selectedPost.content}</div>
            
            {!adsDisabled && (
              <div className="eco-ad-bar" style={{marginTop: '3rem'}}>
                <span className="ad-label">ARTICLE SPONSOR</span>
                <div className="ad-content">Get 20% off Bamboo Home Essentials.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interstitial Ad Modal */}
      {showInterstitial && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" style={{background: '#fff', padding: '3rem', borderRadius: '20px', maxWidth: '600px', width: '90%', textAlign: 'center', border: '1px solid #ddd', position: 'relative'}}>
            <span className="ad-tag" style={{display: 'inline-block', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px'}}>SPONSORED CONTENT</span>
            <h2 style={{fontSize: '2rem', marginBottom: '1rem', color: '#166534'}}>Join the Green Revolution</h2>
            <p style={{color: '#666', marginBottom: '2rem'}}>Start your sustainable journey today. Access exclusive eco-tips, guides, and community resources.</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <button onClick={() => {setShowInterstitial(false); setSelectedPost(pendingPost); setPendingPost(null);}} style={{padding: '1rem 2rem', background: 'transparent', border: '1px solid #ccc', color: '#333', borderRadius: '8px', cursor: 'pointer'}}>Skip Ad</button>
              <button style={{padding: '1rem 2rem', background: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>Learn More</button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Upgrade Modal */}
      {showPremiumModal && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" style={{background: '#fff', padding: '4rem 3rem', borderRadius: '20px', maxWidth: '500px', width: '90%', textAlign: 'center', border: '1px solid var(--primary)', position: 'relative'}}>
            <button onClick={() => setShowPremiumModal(false)} style={{position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: '#333', fontSize: '2rem', cursor: 'pointer'}}>×</button>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1rem', color: '#166534'}}>ECO <span style={{color: 'var(--primary)'}}>PRO</span></h2>
            <p style={{color: '#666', fontSize: '1.1rem', marginBottom: '2rem'}}>Unlock an ad-free reading experience, exclusive guides, and premium resources.</p>
            <button onClick={() => {setAdsDisabled(true); setShowPremiumModal(false); setShowFloatingAd(false);}} style={{width: '100%', padding: '1.2rem', background: 'var(--primary)', border: 'none', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem'}}>
              Upgrade for $4.99/mo
            </button>
            <p style={{color: '#999', fontSize: '0.9rem'}}>Cancel anytime. No commitment.</p>
          </div>
        </div>
      )}

      {/* Floating Ad Banner */}
      {!adsDisabled && showFloatingAd && (
        <div style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: '700px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', border: '1px solid #ddd', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold'}}>♻</div>
            <div>
              <p style={{fontSize: '0.8rem', color: '#999', margin: 0, textTransform: 'uppercase', letterSpacing: '1px'}}>Sponsored</p>
              <strong style={{color: '#333', fontSize: '0.95rem'}}>Eco-Friendly Home Starter Kit</strong>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button style={{background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem'}}>Shop Now</button>
            <button onClick={() => setShowFloatingAd(false)} style={{background: 'none', border: 'none', color: '#999', fontSize: '1.5rem', cursor: 'pointer'}}>×</button>
          </div>
        </div>
      )}

      <footer className="eco-footer">
        <div className="footer-grid">
          <div className="footer-brand">Eco Vibe</div>
          <div className="footer-col">
            <h4>Discover</h4>
            <a href="#">Latest</a><a href="#">Categories</a><a href="#">Podcasts</a>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <a href="#">Contact</a><a href="#">Contribute</a><a href="#">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">Newsletter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Eco Vibe. Sustainable living. | <a href="#">Terms</a> | <a href="#">Privacy</a></p>
        </div>
      </footer>
    </div>
  );
}
