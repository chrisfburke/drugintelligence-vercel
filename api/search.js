export default async function handler(req, res) {
  // Only allow incoming POST requests from your frontend dashboard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { TAVILY_API_KEY } = process.env;
  if (!TAVILY_API_KEY) {
    return res.status(500).json({ error: 'TAVILY_API_KEY environment variable is not set.' });
  }

  const { query, category, region, state } = req.body || {};

  // 1. Synthesize user filters into a targeted search phrase
  const geoContext = state 
    ? state 
    : region 
    ? `${region} US` 
    : 'United States';

  const topicContext = query || 'illicit drug use drug testing toxicology overdose';
  const categoryContext = category ? category : '';
  const fullSearchQuery = `${topicContext} ${categoryContext} toxicology ${geoContext}`.trim();

  try {
    // 2. Query Tavily's specialized research index securely
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: fullSearchQuery,
        search_depth: 'basic',
        include_answer: false,
        max_results: 6
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(200).json({ articles: [], message: `Upstream search error. Please check configurations.` });
    }

    const data = await response.json();
    const results = data.results || [];

    // 3. Map Tavily's stable return payload directly to your dashboard schema
    const articles = results.map((item) => {
      let cleanSource = 'Intelligence Source';
      try {
        if (item.url) {
          cleanSource = new URL(item.url).hostname.replace('www.', '');
        }
      } catch (e) {}

      // Clean up snippets that might contain raw markdown characters
      const cleanSummary = (item.content || 'No summary overview provided.')
        .replace(/`{1,3}/g, '')
        .trim();

      return {
        title: item.title || 'Untitled Article',
        source: cleanSource,
        date: 'Recent', 
        url: item.url || '',
        summary: cleanSummary,
        category: category || 'Public Health',
        geography: state || region || 'National',
        relevance_tags: (query || 'toxicology').toLowerCase().split(' ').slice(0, 3)
      };
    });

    return res.status(200).json({ articles });

  } catch (err) {
    return res.status(200).json({ 
      articles: [], 
      message: "The intelligence matrix is temporarily unavailable. Please try again shortly." 
    });
  }
}