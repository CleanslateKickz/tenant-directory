import { useEffect, useState } from 'react';

const API_KEY = 'pub_7305a815e4af44b19be41f43941986ca';
const BASE_URL = 'https://newsdata.io/api/1/news';

export interface NewsArticle {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  source_id?: string;
}

export function useNewsData(companyName: string) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyName) return;
    setLoading(true);
    setError(null);
    setArticles([]);

    const url = `${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(companyName)}&language=en`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && Array.isArray(data.results)) {
          setArticles(data.results.map((item: any) => ({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate,
            source_id: item.source_id,
          })));
        } else {
          setError('No news found.');
        }
      })
      .catch(err => setError('Failed to fetch news.'))
      .finally(() => setLoading(false));
  }, [companyName]);

  return { articles, loading, error };
} 