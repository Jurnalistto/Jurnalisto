'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAllDaerah } from '../lib/daerah';
import { getLatestBerita, getFeaturedBerita, getKategoriList } from '../data/berita';

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const [selectedDaerah, setSelectedDaerah] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    const updateDate = () => {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const now = new Date();
      const dayName = days[now.getDay()];
      const day = String(now.getDate()).padStart(2, '0');
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      setCurrentDate(`${dayName}, ${day} ${month} ${year}`);
    };
    
    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();
  const daerahListRaw = getAllDaerah();
  const kupangKota = daerahListRaw.find(d => d.id === 'kupang-kota');
  const kupangKab = daerahListRaw.find(d => d.id === 'kupang-kab');
  const daerahList = daerahListRaw
    .filter(d => d.id !== 'kupang-kota' && d.id !== 'kupang-kab')
    .sort((a, b) => a.nama.localeCompare(b.nama))
    .flatMap(d => {
      if (d.id === 'lembata') return [kupangKab, kupangKota, d];
      return [d];
    });
  const allLatest = getLatestBerita();
  const kategoris = [...getKategoriList(), 'Inspirasi', 'Teknologi'];

  const getFilteredNews = () => {
    let result = allLatest;
    if (selectedDaerah) {
      result = result.filter(b => b.daerah === selectedDaerah.nama);
    }
    if (selectedKategori) {
      result = result.filter(b => b.kategori === selectedKategori);
    }
    return result;
  };

  const filteredNews = getFilteredNews();
  const displayNews = filteredNews.slice(0, 4);
  const latestNews = filteredNews;

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/cari?q=${encodeURIComponent(search)}`);
    }
  };

  const handleDaerahClick = (daerah) => {
    if (selectedDaerah?.id === daerah.id) {
      setSelectedDaerah(null);
    } else {
      setSelectedDaerah(daerah);
    }
  };

  const handleKategoriClick = (kat) => {
    if (selectedKategori === kat) {
      setSelectedKategori(null);
    } else {
      setSelectedKategori(kat);
    }
  };

  const getLabel = (nama) => {
    if (nama === 'Kota Kupang') return { display: 'Ibukota\nKupang' };
    if (nama === 'Kabupaten Kupang') return { display: 'Kupang' };
    const parts = nama.split(' ');
    const prefix = parts[0];
    const name = parts.slice(1).join(' ');
    return { display: name || prefix };
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50">
        <div className="bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900">
          <div className="max-w-7xl mx-auto px-4 pt-6">
            <img 
              src="/JurnalistoX.png" 
              alt="Jurnalisto" 
              className="h-16 sm:h-24 w-auto mx-auto mb-3"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 pb-3">
            <div className="w-full max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="hidden sm:block">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berita..."
                  className="w-full px-4 py-2 text-sm bg-white/95 text-gray-800 rounded-full border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-lg"
                />
              </form>
            </div>
            <div className="sm:hidden">
              <form onSubmit={handleSearch} className="w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berita..."
                  className="w-full px-4 py-2 text-sm bg-white/95 text-gray-800 rounded-full border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-lg"
                />
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-violet-800">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="marquee-container py-1.5">
              <div className="marquee-content">
                {daerahList.map((daerah, index) => (
                  <button
                    key={`daerah-${daerah.id}-${index}`}
                    onClick={() => handleDaerahClick(daerah)}
                    className={`mx-0.5 px-2.5 py-1 flex-shrink-0 rounded-lg text-[10px] font-semibold transition-all ${
                      selectedDaerah?.id === daerah.id
                        ? 'bg-violet-500 text-white shadow-md'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    {getLabel(daerah.nama).display.toUpperCase()}
                  </button>
                ))}
                <button
                  onClick={() => { setSelectedDaerah(null); setSelectedKategori(null); }}
                  className={`mx-0.5 px-2.5 py-1 flex-shrink-0 rounded-lg text-[10px] font-semibold transition-all ${
                    !selectedDaerah && !selectedKategori
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  BERANDA UTAMA
                </button>
                {[...daerahList, ...daerahList].map((daerah, index) => (
                  <button
                    key={`daerah2-${daerah.id}-${index}`}
                    onClick={() => handleDaerahClick(daerah)}
                    className={`mx-0.5 px-2.5 py-1 flex-shrink-0 rounded-lg text-[10px] font-semibold transition-all ${
                      selectedDaerah?.id === daerah.id
                        ? 'bg-violet-500 text-white shadow-md'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    {getLabel(daerah.nama).display.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-700">
          <div className="max-w-7xl mx-auto px-4 py-1.5">
            <div className="marquee-container">
              <div className="marquee-smooth">
                <button 
                  onClick={() => { setSelectedDaerah(null); setSelectedKategori(null); }} 
                  className={`mx-0.5 px-2 py-0.5 flex-shrink-0 rounded text-[9px] font-bold transition-all ${
                    !selectedDaerah && !selectedKategori 
                      ? 'bg-red-600 text-white' 
                      : 'bg-purple-900/50 text-white hover:bg-purple-900'
                  }`}
                >
                  BERANDA
                </button>
                {[...kategoris, ...kategoris, ...kategoris].map((kat, index) => (
                  <button 
                    key={`kat-${kat}-${index}`}
                    onClick={() => handleKategoriClick(kat)} 
                    className={`mx-0.5 px-2 py-0.5 flex-shrink-0 rounded text-[9px] font-bold transition-all ${
                      selectedKategori === kat 
                        ? 'bg-white text-purple-800' 
                        : 'bg-purple-900/50 text-white hover:bg-purple-900'
                    }`}
                  >
                    {kat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
            <span className="text-violet-400 font-semibold">Jurnalisto - Portal Berita Terpercaya NTT</span>
            <span className="text-white font-medium">{currentDate}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        {(selectedDaerah || selectedKategori) && (
          <div className="mb-4 p-3 bg-violet-50 rounded-lg border border-violet-200">
            <p className="text-center text-sm text-orange-700">
              Menampilkan: <span className="font-bold">
                {selectedDaerah?.nama && selectedKategori 
                  ? `${selectedKategori} - ${selectedDaerah.nama}` 
                  : (selectedDaerah?.nama || selectedKategori)}
              </span>
            </p>
          </div>
        )}

        {displayNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {displayNews[0] && (
                <article className="lg:col-span-2 group">
                  <Link href={`/berita/${displayNews[0].slug}`} className="block">
                    <div className="relative h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={displayNews[0].gambar}
                        alt={displayNews[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-lg">
                          HEADLINE
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <span className="px-2 py-0.5 bg-violet-600 text-white text-[10px] sm:text-xs font-semibold rounded mb-2 inline-block">
                          {displayNews[0].kategori}
                        </span>
                        <h2 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                          {displayNews[0].title}
                        </h2>
                        <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 mb-2 hidden sm:block">
                          {displayNews[0].excerpt}
                        </p>
                        <div className="flex items-center text-gray-300 text-[10px] sm:text-xs gap-2">
                          <span>{displayNews[0].penulis}</span>
                          <span>•</span>
                          <span>{displayNews[0].tanggal}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )}
              
              <div className="flex flex-col gap-3">
                {displayNews.slice(1, 4).map((berita) => (
                  <article key={berita.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all flex-1">
                    <Link href={`/berita/${berita.slug}`} className="flex h-full">
                      <div className="relative w-28 sm:w-32 flex-shrink-0">
                        <Image
                          src={berita.gambar}
                          alt={berita.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2.5 sm:p-3 flex flex-col justify-center flex-1">
                        <span className="text-[9px] sm:text-[10px] font-bold text-violet-700 uppercase tracking-wide">
                          {berita.kategori}
                        </span>
                        <h3 className="font-serif text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-violet-600 transition-colors mt-1">
                          {berita.title}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1">
                          {berita.penulis} • {berita.tanggal}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <section className="border-t-4 border-violet-600 pt-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                BERITA TERKINI
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {latestNews.map((berita) => (
                  <article key={berita.id} className="group flex gap-3 bg-white rounded-lg p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow">
                    <Link href={`/berita/${berita.slug}`} className="flex-shrink-0">
                      <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-lg overflow-hidden">
                        <Image
                          src={berita.gambar}
                          alt={berita.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/berita/${berita.slug}`}>
                        <span className="text-[9px] sm:text-[10px] font-bold text-orange-600 uppercase tracking-wide">
                          {berita.kategori}
                        </span>
                        <h3 className="font-serif text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-violet-600 transition-colors mt-0.5">
                          {berita.title}
                        </h3>
                        <div className="flex items-center text-[9px] sm:text-[10px] text-gray-400 mt-1 gap-1 sm:gap-2">
                          <span>{berita.penulis}</span>
                          <span>•</span>
                          <span>{berita.tanggal}</span>
                        </div>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl mb-6 shadow-lg">
            <p className="text-gray-500">Tidak ada berita untuk kategori ini.</p>
          </div>
        )}
      </main>

      <footer className="bg-slate-950 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-pink-400 text-xs">Copyright @ Jurnalisto 2026</p>
        </div>
      </footer>
    </div>
  );
}
