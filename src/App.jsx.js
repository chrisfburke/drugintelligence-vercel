import React, { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('Urine drug testing accuracy');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [timeRange, setTimeRange] = useState('1year');
  const [sortOrder, setSortOrder] = useState('recent');
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Predefined quick tags from your dashboard design
  const quickTags = [
    'Fentanyl adulterants',
    'Xylazine wound infections',
    'Nitazenes detection',
    'Urine drug testing accuracy',
    'Kratom toxicology',
    'Drug checking services',
    'Overdose surveillance',
    'Synthetic cannabinoids'
  ];

  const handleSearch = async (searchQuery = query) => {
    setLoading(true);
    setMsg('');
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: searchQuery,
          category,
          region,
          state,
          timeRange,
          sortOrder
        })
      });
      const data = await response.json();
      setArticles(data.articles || []);
      if (data.message) setMsg(data.message);
    } catch (e) {
      setMsg('Failed to fetch intelligence documentation.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTagClick = (tag) => {
    setQuery(tag);
    handleSearch(tag);
  };

  // Color Palette Definitions matching your original layout
  const colors = {
    brandDark: '#7A4F1D', // Custom brown accents
    brandLight: '#A37033',
    textDark: '#2C2520',
    bgLight: '#FCFAF7',
    border: '#E8E2D9',
    tagBg: '#FFFFFF'
  };

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      backgroundColor: colors.bgLight, 
      minHeight: '100vh', 
      color: colors.textDark,
      padding: '2.5rem 1.5rem' 
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '700', color: colors.brandLight, letterSpacing: '0.05em' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: colors.brandLight, borderRadius: '50%' }}></span>
            Drug Intelligence Monitor
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0.5rem 0 0.25rem 0', letterSpacing: '-0.02em' }}>
            Illicit Drug & Toxicology Intelligence
          </h1>
          <p style={{ margin: 0, color: '#70655B', fontSize: '1.05rem' }}>
            Search news, research, and policy — filtered by topic, category, and geography
          </p>
        </header>

        {/* Search & Filter Controls Panel */}
        <section style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(122, 79, 29, 0.04)', border: `1px solid ${colors.border}`, marginBottom: '2rem' }}>
          
          {/* Search Input Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Enter search terms (e.g., adulterants, specific novel psychoactive substances...)"
              style={{ flex: 1, padding: '0.85rem 1.25rem', fontSize: '1rem', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: colors.bgLight, outline: 'none' }}
            />
            <button 
              onClick={() => handleSearch()} 
              disabled={loading}
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: '600', color: '#FFFFFF', backgroundColor: colors.brandDark, border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.brandLight}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.brandDark}
            >
              {loading ? 'Searching...' : 'Search ↗'}
            </button>
          </div>

          {/* Filter Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: '#FFF', outline: 'none' }}>
              <option value="">All categories</option>
              <option value="News">News</option>
              <option value="Research">Research</option>
              <option value="Policy">Policy</option>
              <option value="Law Enforcement">Law Enforcement</option>
              <option value="Public Health">Public Health</option>
            </select>

            <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: '#FFF', outline: 'none' }}>
              <option value="">All regions</option>
              <option value="Northeast">Northeast</option>
              <option value="Southeast">Southeast</option>
              <option value="Midwest">Midwest</option>
              <option value="Southwest">Southwest</option>
              <option value="West">West</option>
            </select>

            <select value={state} onChange={(e) => setState(e.target.value)} style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: '#FFF', outline: 'none' }}>
              <option value="">All states</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Florida">Florida</option>
              <option value="California">California</option>
              <option value="Texas">Texas</option>
              <option value="Ohio">Ohio</option>
            </select>
          </div>

          {/* Filter Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: '#FFF', outline: 'none' }}>
              <option value="3months">Past 3 months</option>
              <option value="6months">Past 6 months</option>
              <option value="1year">Past year</option>
              <option value="2years">Past 2 years</option>
              <option value="alltime">All time</option>
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '0.75rem', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: '#FFF', outline: 'none' }}>
              <option value="recent">Sort: Most recent</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="relevant">Sort: Relevance</option>
            </select>
          </div>

          {/* Quick Tags Component Block */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#8A7F75', fontWeight: '600', textTransform: 'uppercase', marginRight: '0.25rem', letterSpacing: '0.05em' }}>Quick:</span>
            {quickTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickTagClick(tag)}
                style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', border: `1px solid ${colors.border}`, backgroundColor: colors.tagBg, color: colors.textDark, cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.15s ease' }}
                onMouseOver={(e) => { e.target.style.borderColor = colors.brandLight; e.target.style.backgroundColor = colors.bgLight; }}
                onMouseOut={(e) => { e.target.style.borderColor = colors.border; e.target.style.backgroundColor = colors.tagBg; }}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Emergency Context Messaging Grid */}
        {msg && (
          <div style={{ backgroundColor: '#FDF2F2', border: '1px solid #F8B4B4', color: '#9B1C1C', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: '500' }}>
            <strong>Notice:</strong> {msg}
          </div>
        )}

        {/* Results Container Grid */}
        <main style={{ display: 'grid', gap: '1.25rem' }}>
          {articles.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#8A7F75', backgroundColor: '#FFFFFF', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>No analytics pulled yet.</p>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Enter keywords above or click a quick tag to stream toxicological field reports.</p>
            </div>
          )}

          {articles.map((art, idx) => (
            <article 
              key={idx} 
              style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: `1px solid ${colors.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'transform 0.15s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.4' }}>
                  <a href={art.url} target="_blank" rel="noreferrer" style={{ color: colors.textDark, textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.15s' }} onMouseOver={(e) => e.target.style.color = colors.brandLight} onMouseOut={(e) => e.target.style.color = colors.textDark}>
                    {art.title}
                  </a>
                </h3>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.6rem', borderRadius: '4px', backgroundColor: '#F0EAE1', color: colors.brandDark, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {art.category}
                </span>
              </div>
              
              <p style={{ margin: 0, color: '#4A4036', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {art.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', paddingTop: '0.5rem', borderTop: `1px solid ${colors.bgLight}`, fontSize: '0.85rem', color: '#8A7F75' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span>Source: <strong style={{ color: colors.textDark }}>{art.source}</strong></span>
                  <span>Location: <strong style={{ color: colors.textDark }}>{art.geography}</strong></span>
                  <span>Timeline: <strong>{art.date}</strong></span>
                </div>
                
                {art.relevance_tags && (
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {art.relevance_tags.map((t, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '0.15rem 0.5rem', backgroundColor: colors.bgLight, borderRadius: '4px', color: '#60554A' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}