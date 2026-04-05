'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDaerah } from '../../lib/daerah';
import { getLatestBerita, getFeaturedBerita, getKategori } from '../../data/berita';

export default function HomePage() {
  const [selectedDaerah, setSelectedDaerah] = useState(null);
  const daerahList = getAllDaerah();
  const featured = getFeaturedBerita();
  const latest = getLatestBerita();
  const kategoris = getKategori();

  const utama = featured[0];
  const subFeatured = featured.slice(1, 4);
  const trending = latest.slice(0, 3);

  const getLabel = (nama) => {
    const parts = nama.split(' ');
    const prefix = parts[0];
    const name = parts.slice(1).join(' ');
    return { prefix, name };
  };

  const row1 = daerahList.slice(0, 11);
  const row2 = daerahList.slice(11, 22);
  const row3 = daerahList.slice(22);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {selectedDaerah && (
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-10 rounded-full"
                  style={{ backgroundColor: selectedDaerah.warna }}
                />
                <div>
                  <h1 className="font-serif text-lg font-bold" style={{ color: selectedDaerah.warna }}>
                    {selectedDaerah.nama}
                  </h1>
                  <p className="text-xs text-gray-500">Portal Berita Resmi</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDaerah(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ✕ Tutup Filter
              </button>
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="mb-6">
            <div className="text-center mb-4">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                JURNALISTTO
              </h1>
              <p className="text-sm text-gray-500">Menerangi Nusa Cendana</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between">
                {row1.map((daerah) => (
                  <button
                    key={daerah.id}
                    onClick={() => setSelectedDaerah(daerah)}
                    className={`px-1 py-1 rounded text-center transition-all border ${
                      selectedDaerah?.id === daerah.id 
                        ? 'text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ 
                      width: 'calc(100% / 11 - 2px)', 
                      height: '44px',
                      ...(selectedDaerah?.id === daerah.id && { backgroundColor: daerah.warna })
                    }}
                  >
                    <span className="text-[7px] block leading-tight">{getLabel(daerah.nama).prefix}</span>
                    <span className="font-bold text-[10px] block leading-tight">{getLabel(daerah.nama).name}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-0.5">
                {row2.map((daerah) => (
                  <button
                    key={daerah.id}
                    onClick={() => setSelectedDaerah(daerah)}
                    className={`px-1 py-1 rounded text-center transition-all border ${
                      selectedDaerah?.id === daerah.id 
                        ? 'text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ 
                      width: 'calc(100% / 11 - 2px)', 
                      height: '44px',
                      ...(selectedDaerah?.id === daerah.id && { backgroundColor: daerah.warna })
                    }}
                  >
                    <span className="text-[7px] block leading-tight">{getLabel(daerah.nama).prefix}</span>
                    <span className="font-bold text-[10px] block leading-tight">{getLabel(daerah.nama).name}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center mt-0.5">
                {row3.map((daerah) => (
                  <button
                    key={daerah.id}
                    onClick={() => setSelectedDaerah(daerah)}
                    className={`px-1 py-1 rounded text-center transition-all border ${
                      selectedDaerah?.id === daerah.id 
                        ? 'text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ 
                      width: 'calc(100% / 2 - 4px)', 
                      height: '44px',
                      ...(selectedDaerah?.id === daerah.id && { backgroundColor: daerah.warna })
                    }}
                  >
                    <span className="text-[7px] block leading-tight">{getLabel(daerah.nama).prefix}</span>
                    <span className="font-bold text-[10px] block leading-tight">{getLabel(daerah.nama).name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedDaerah && (
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${selectedDaerah.warna}10`, borderLeft: `4px solid ${selectedDaerah.warna}` }}>
              <p className="text-sm font-medium" style={{ color: selectedDaerah.warna }}>
                📍 Menampilkan berita dari {selectedDaerah.nama}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {utama && (
                <article className="mb-6 group">
                  <Link href={`/berita/${utama.slug}`} className="block">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-3">
                      <Image
                        src={utama.gambar}
                        alt={utama.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                          HEADLINE
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded mb-2 inline-block">
                          {utama.kategori}
                        </span>
                        <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                          {utama.title}
                        </h2>
                        <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                          {utama.excerpt}
                        </p>
                        <div className="flex items-center text-gray-300 text-xs gap-2">
                          <span>{utama.penulis}</span>
                          <span>•</span>
                          <span>{utama.tanggal}</span>
                          <span>•</span>
                          <span>5 menit baca</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {subFeatured.map((berita) => (
                  <article key={berita.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <Link href={`/berita/${berita.slug}`} className="block">
                      <div className="relative h-40">
                        <Image
                          src={berita.gambar}
                          alt={berita.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-medium rounded">
                            {berita.kategori}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-serif text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {berita.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {berita.excerpt}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-2">
                          {berita.penulis} • {berita.tanggal}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <section className="border-t-2 border-gray-900 pt-4">
                <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                  BERITA TERKINI
                </h2>
                <div className="space-y-4">
                  {latest.map((berita) => (
                    <article key={berita.id} className="group flex gap-4 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                      <Link href={`/berita/${berita.slug}`} className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
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
                          <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                            {berita.kategori}
                          </span>
                          <h3 className="font-serif text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mt-1">
                            {berita.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {berita.excerpt}
                          </p>
                          <div className="flex items-center text-[10px] text-gray-400 mt-2 gap-2">
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

            <div className="lg:col-span-1">
              <aside className="sticky top-4 space-y-6">
                <section className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-serif text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
                    🔥 TRENDING
                  </h3>
                  <div className="space-y-3">
                    {trending.map((berita, index) => (
                      <Link key={berita.id} href={`/berita/${berita.slug}`} className="block group">
                        <div className="flex gap-2">
                          <span className="text-2xl font-bold text-gray-200">{index + 1}</span>
                          <div>
                            <span className="text-[10px] text-blue-600 font-semibold uppercase">
                              {berita.kategori}
                            </span>
                            <h4 className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {berita.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-serif text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
                    KATEGORI
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {kategoris.map((kat) => (
                      <span key={kat} className="px-3 py-1.5 bg-gray-100 text-xs font-medium text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                        {kat}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 text-white">
                  <h3 className="font-serif text-sm font-bold mb-2">
                    📬 Newsletter
                  </h3>
                  <p className="text-xs text-blue-100 mb-3">
                    Dapatkan berita terbaru langsung ke email Anda
                  </p>
                  <input 
                    type="email" 
                    placeholder="Email Anda..."
                    className="w-full px-3 py-2 rounded-lg text-gray-900 text-xs mb-2"
                  />
                  <button className="w-full py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
                    Berlangganan
                  </button>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="font-serif text-xl font-bold mb-2">JURNALISTTO</h2>
            <p className="text-sm text-gray-400 mb-4">Menerangi Nusa Cendana</p>
            <div className="flex justify-center gap-6 text-xs text-gray-400 mb-4">
              <a href="#" className="hover:text-white">Tentang Kami</a>
              <a href="#" className="hover:text-white">Kontak</a>
              <a href="#" className="hover:text-white">Kebijakan Privasi</a>
            </div>
            <p className="text-xs text-gray-500">Copyright @ Jurnalisto 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
