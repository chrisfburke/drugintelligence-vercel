import React, { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('Urine drug testing accuracy');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setMsg('');
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
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

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Illicit Drug & Toxicology Intelligence</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {msg && <div style={{ background: '#f8d7da', padding: '0.75rem', marginBottom: '1rem' }}>{msg}</div>}

      <div>
        {articles.map((art, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
            <h4><a href={art.url} target="_blank" rel="noreferrer">{art.title}</a></h4>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>{art.source} — {art.geography}</p>
            <p>{art.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
