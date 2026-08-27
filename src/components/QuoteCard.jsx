export default function QuoteCard({ quote, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(quote)}
      className="group bg-[#FBF9F1] border border-stone-200 hover:border-emerald-500 p-6 rounded-lg cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between h-48 shadow-sm hover:shadow-md"
    >
      <p className="text-sm font-mono text-stone-700 line-clamp-4 leading-relaxed">
        "{quote.quote}"
      </p>
      <p className="text-xs font-semibold text-stone-400 group-hover:text-emerald-600 transition-colors uppercase font-sans mt-2">
        — {quote.author}
      </p>
    </div>
  );
}