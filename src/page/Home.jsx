import { useState, useEffect } from 'react';
import MainQuoteCard from '../components/MainQuoteCard';
import QuoteCard from '../components/QuoteCard';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Home() {
  const [featuredQuote, setFeaturedQuote] = useState(null);
  const [collection, setCollection] = useState([]);
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [errorMain, setErrorMain] = useState(null);

  
  const fetchRandomQuote = async () => {
    setLoadingMain(true);
    setErrorMain(null);
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      if (!res.ok) throw new Error('Failed to fetch a new quote.');
      const data = await res.json(); 
      setFeaturedQuote(data);
    } catch (err) {
      setErrorMain(err.message);
    } finally {
      setLoadingMain(false);
    }
  };

  
  const fetchCollection = async () => {
    setLoadingGrid(true);
    try {
      const res = await fetch('https://dummyjson.com/quotes?limit=9');
      if (!res.ok) throw new Error('Failed to load collection.');
      const data = await res.json(); 
      setCollection(data.quotes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGrid(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
    fetchCollection();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16">
      
      <section className="min-h-[350px] flex items-center justify-center">
        {loadingMain ? (
          <SkeletonLoader />
        ) : errorMain ? (
          <div className="text-center space-y-4">
            <p className="text-red-500 font-medium">{errorMain}</p>
            <button 
              onClick={fetchRandomQuote}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <MainQuoteCard 
            quote={featuredQuote} 
            onNewQuote={fetchRandomQuote} 
            disabled={loadingMain} 
          />
        )}
      </section>

      
      <section className="space-y-6">
        <h2 className="text-2xl font-mono tracking-tight text-stone-800 border-b border-stone-300 pb-2">
          Curated Collection
        </h2>
        {loadingGrid ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonLoader key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.map((item) => (
              <QuoteCard 
                key={item.id} 
                quote={item} 
                onSelect={(selected) => {
                  setFeaturedQuote(selected);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
