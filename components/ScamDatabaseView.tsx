
import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ShieldAlert, MessageSquare, Phone, Globe, Share2, Bookmark, X } from 'lucide-react';
import { SCAM_PATTERNS } from '../constants';
import { Screen, ScamPattern } from '../types';

interface ScamDatabaseProps {
  onBack: () => void;
  initialQuery?: string;
}

const ScamDatabaseView: React.FC<ScamDatabaseProps> = ({ onBack, initialQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SMS' | 'CALL' | 'WEB'>('ALL');

  // Auto-search if initialQuery is provided
  useEffect(() => {
    if (initialQuery) {
        setSearchTerm(initialQuery);
    }
  }, [initialQuery]);

  const filteredPatterns = SCAM_PATTERNS.filter(pattern => {
    const matchesSearch = pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pattern.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || pattern.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const clearSearch = () => {
      setSearchTerm('');
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col animate-fadeIn font-sans pb-24">
      {/* Header */}
      <div className="bg-purple-900 text-white p-6 pb-8 rounded-b-[2rem] shadow-lg sticky top-0 z-10">
         <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Knowledge Base</h1>
         </div>
         
         <div className="relative">
             <div className="absolute left-3 top-3 text-purple-300">
                 <Search size={18} />
             </div>
             <input 
                type="text" 
                placeholder="Search scams (e.g., 'Colissimo', 'Bank')..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-purple-300 focus:outline-none focus:bg-white/20 focus:border-white/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
             {searchTerm && (
                 <button onClick={clearSearch} className="absolute right-3 top-3 text-purple-300 hover:text-white">
                     <X size={18} />
                 </button>
             )}
         </div>
         
         {initialQuery && searchTerm === initialQuery && (
             <div className="mt-3 flex items-center gap-2 text-xs text-purple-200 bg-purple-800/50 p-2 rounded-lg border border-purple-700">
                 <ShieldAlert size={14} />
                 <span>Showing result for detected threat: <strong>"{initialQuery}"</strong></span>
             </div>
         )}
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {['ALL', 'SMS', 'CALL', 'WEB'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                    activeFilter === filter 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                  {filter}
              </button>
          ))}
      </div>

      {/* List */}
      <div className="px-6 space-y-4">
        {filteredPatterns.map((pattern) => (
            <ScamCard key={pattern.id} pattern={pattern} highlight={searchTerm.length > 0} />
        ))}
        {filteredPatterns.length === 0 && (
            <div className="text-center py-10 opacity-50 flex flex-col items-center">
                <Search size={48} className="mb-4 text-gray-300"/>
                <p>No results found for "{searchTerm}".</p>
                <button onClick={clearSearch} className="mt-4 text-purple-600 font-bold text-sm">Clear Search</button>
            </div>
        )}
      </div>
    </div>
  );
};

const ScamCard: React.FC<{pattern: ScamPattern, highlight?: boolean}> = ({ pattern, highlight }) => {
    const getIcon = () => {
        switch(pattern.category) {
            case 'SMS': return <MessageSquare size={16} />;
            case 'CALL': return <Phone size={16} />;
            case 'WEB': return <Globe size={16} />;
            default: return <ShieldAlert size={16} />;
        }
    };

    return (
        <div className={`bg-white p-5 rounded-2xl shadow-sm border transition-all group hover:shadow-md ${highlight ? 'border-purple-200 ring-1 ring-purple-100' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-2">
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 ${
                    pattern.category === 'SMS' ? 'bg-blue-50 text-blue-600' :
                    pattern.category === 'CALL' ? 'bg-orange-50 text-orange-600' :
                    'bg-pink-50 text-pink-600'
                }`}>
                    {getIcon()}
                    {pattern.category}
                </div>
                <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    Risk Score: {pattern.riskScore}/100
                </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-1">{pattern.title}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{pattern.description}</p>
            
            <div className="bg-gray-50 p-3 rounded-xl mb-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Prevention Tip</p>
                <p className="text-xs text-gray-700 font-medium">{pattern.prevention}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    Source: {pattern.source}
                </span>
                <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-purple-600"><Bookmark size={16}/></button>
                    <button className="text-gray-400 hover:text-blue-600"><Share2 size={16}/></button>
                </div>
            </div>
        </div>
    );
};

export default ScamDatabaseView;
