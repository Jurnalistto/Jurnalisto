'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAllDaerah } from '../lib/daerah';
import { getLatestBerita, getFeaturedBerita, getKategoriList, getBeritaByKategori } from '../data/berita';

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
  const featured = getFeaturedBerita();
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
    if (nama === 'Kota Kupang') {
      return { display: 'Ibukota\nKupang' };
    }
    if (nama === 'Kabupaten Kupang') {
      return { display: 'Kupang' };
    }
    const parts = nama.split(' ');
    const prefix = parts[0];
    const name = parts.slice(1).join(' ');
    return { display: name || prefix };
  };

  const row1 = daerahList.slice(0, 11);
  const row2 = daerahList.slice(11, 22);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 shadow-md border-b border-gray-200 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-1">
          <div className="flex items-center justify-between">
            <img 
              src="/JurnalistoX.png" 
              alt="Jurnalisto" 
              className="h-16 sm:h-20 md:h-24 w-auto"
            />
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari..."
                  className="w-20 sm:w-28 px-2 py-1 text-xs text-white placeholder-gray-400 bg-white/10 rounded border border-white/20 focus:outline-none focus:border-white/40"
                />
              </form>
              <div className="text-[10px] sm:text-xs text-white font-medium bg-white/10 px-2 py-1 rounded border border-white/20">
                {currentDate}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="marquee-container">
            <div className="marquee-content">
              {daerahList.map((daerah, index) => (
                <button
                  key={`daerah-${daerah.id}-${index}`}
                  onClick={() => handleDaerahClick(daerah)}
                  className={`mx-0.5 px-3 py-2 flex-shrink-0 rounded-2xl text-sm font-medium transition-all ${
                    selectedDaerah?.id === daerah.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {getLabel(daerah.nama).display.toUpperCase()}
                </button>
              ))}
              <button
                onClick={() => { setSelectedDaerah(null); setSelectedKategori(null); }}
                className={`mx-0.5 px-3 py-2 flex-shrink-0 rounded-2xl text-sm font-medium transition-all ${
                  !selectedDaerah && !selectedKategori
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                BERANDA UTAMA
              </button>
              {[...daerahList, ...daerahList].map((daerah, index) => (
                <button
                  key={`daerah-${daerah.id}-${index}`}
                  onClick={() => handleDaerahClick(daerah)}
                  className={`mx-0.5 px-3 py-2 flex-shrink-0 rounded-2xl text-sm font-medium transition-all ${
                    selectedDaerah?.id === daerah.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {getLabel(daerah.nama).display.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="marquee-container">
            <div className="marquee-smooth">
              <button 
                onClick={() => { setSelectedDaerah(null); setSelectedKategori(null); }} 
                className={`mx-1 px-2 py-1 flex-shrink-0 rounded-2xl text-[10px] font-medium transition-all ${
                  !selectedDaerah && !selectedKategori 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                BERANDA
              </button>
              {[...kategoris, ...kategoris, ...kategoris, ...kategoris].map((kat, index) => (
                <button 
                  key={`kategori-${kat}-${index}`}
                  onClick={() => handleKategoriClick(kat)} 
                  className={`mx-1 px-2 py-1 flex-shrink-0 rounded-2xl text-[10px] font-bold transition-all ${
                    selectedKategori === kat 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 max-w-7xl mx-auto p-2 sm:p-4">
        {(selectedDaerah || selectedKategori) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-center text-sm text-blue-700">
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
            {displayNews[0] && (
              <article className="mb-4 group">
                <Link href={`/berita/${displayNews[0].slug}`} className="block">
                  <div className="relative h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={displayNews[0].gambar}
                      alt={displayNews[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                        HEADLINE
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium rounded mb-1 sm:mb-2 inline-block">
                        {displayNews[0].kategori}
                      </span>
                      <h2 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gray-200 transition-colors">
                        {displayNews[0].title}
                      </h2>
                      <p className="text-gray-200 text-[11px] sm:text-sm line-clamp-2 mb-1 sm:mb-2 hidden sm:block">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {displayNews.slice(1, 4).map((berita) => (
                <article key={berita.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <Link href={`/berita/${berita.slug}`} className="block">
                    <div className="relative h-40 sm:h-36">
                      <Image
                        src={berita.gambar}
                        alt={berita.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] sm:text-[10px] font-medium rounded">
                          {berita.kategori}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3">
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {berita.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                        {berita.penulis} • {berita.tanggal}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl mb-6">
            <p className="text-gray-500">Tidak ada berita untuk kategori ini.</p>
          </div>
        )}

        <section className="border-t-2 border-gray-900 pt-3 sm:pt-4">
          <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-5 sm:h-6 bg-red-600 rounded-full"></span>
            BERITA TERKINI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {latestNews.map((berita) => (
              <article key={berita.id} className="group flex gap-2 sm:gap-3 bg-white rounded-lg p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/berita/${berita.slug}`} className="flex-shrink-0">
                  <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden">
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
                    <span className="text-[9px] sm:text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                      {berita.kategori}
                    </span>
                    <h3 className="font-serif text-[11px] sm:text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mt-0.5 sm:mt-1">
                      {berita.title}
                    </h3>
                    <div className="flex items-center text-[9px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1 gap-1 sm:gap-2">
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
      </div>

      <footer className="bg-gray-900 text-white py-3 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-serif text-sm font-bold mb-0">Jurnalisto</h2>
          <p className="text-[10px] text-gray-400 mb-1">Menerangi Nusa Cendana</p>
          <p className="text-[10px] text-gray-500">Copyright @ Jurnalisto 2026</p>
        </div>
      </footer>
    </div>
  );
}
