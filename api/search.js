const DDG = require('duck-duck-scrape');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, category, region, state } = req.body || {};

  const geoContext = state ? state : region ? `${region} US` : 'United States';
  const topicContext = query || 'illicit drug use drug testing toxicology overdose';
  const categoryContext = category ? category : '';
  const fullSearchQuery = `${topicContext} ${categoryContext} toxicology ${geoContext}`.trim();

  try {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15'
    ];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const searchResults = await DDG.search(fullSearchQuery, {
      safeSearch: DDG.SafeSearchType.STRICT,
      headers: {
        'User-Agent': randomUserAgent,
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    const articles = (searchResults.results || []).slice(0, 8).map((item) => {
      let cleanSource = 'Unknown Source';
      try { if (item.url) cleanSource = new URL(item.url).hostname.replace('www.', ''); } catch (e) {}

      return {
        title: item.title || 'Untitled Article',
        source: cleanSource,
        date: 'Recent', 
        url: item.url || '',
        summary: item.description || 'No summary overview provided.',
        category: category || 'News',
        geography: state || region || 'National',
        relevance_tags: (query || 'toxicology').toLowerCase().split(' ').slice(0, 3)
      };
    });

    return res.status(200).json({ articles });
  } catch (err) {
    return res.status(200).json({ articles: [], message: "Search engine busy. Please try again shortly." });
  }
};