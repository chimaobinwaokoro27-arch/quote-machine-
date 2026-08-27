export default function MainQuoteCard({ quote, onNewQuote, disabled }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      
      <div className="absolute inset-0 bg-emerald-200/40 rounded-xl transform -rotate-3 scale-95 transition-transform" />
      <div className="absolute inset-0 bg-amber-200/40 rounded-xl transform rotate-2 scale-98 transition-transform" />

    
      <div className="relative bg-[#FBF9F1] border border-stone-300 rounded-xl p-8 md:p-12 shadow-lg space-y-6">
        <span className="text-4xl text-emerald-600 font-serif leading-none">“</span>
        
        <p className="text-xl md:text-2xl font-mono text-stone-900 leading-relaxed max-w-[65ch]">
          {quote?.quote}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <p className="text-sm font-semibold tracking-wider text-stone-500 uppercase font-sans">
            — {quote?.author}
          </p>

          <button
            onClick={onNewQuote}
            disabled={disabled}
            className="px-5 py-2.5 bg-stone-900 text-stone-100 font-mono text-sm rounded-lg hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {disabled ? 'Fetching...' : 'New Quote'}
          </button>
        </div>
      </div>
    </div>
  );
}