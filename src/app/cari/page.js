import Link from 'next/link';
import Image from 'next/image';
import { getLatestBerita } from '../../data/berita';
import { getDaerahData } from '../../lib/daerah';

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const daerahId = searchParams.daerah || null;
  const daerah = daerahId ? getDaerahData(daerahId) : null;
  const allBerita = getLatestBerita();
  
  const filteredBerita = query 
    ? allBerita.filter(berita => 
        berita.title.toLowerCase().includes(query.toLowerCase()) ||
        berita.content.toLowerCase().includes(query.toLowerCase()) ||
        berita.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              🔍 Hasil Pencarian
            </h1>
            <p className="text-sm text-gray-600 mb-1">
              Menampilkan hasil untuk: <span className="font-semibold text-blue-600">"{query}"</span>
            </p>
            <p className="text-xs text-gray-500">
              Ditemukan <span className="font-bold">{filteredBerita.length}</span> berita
            </p>
          </div>
        </div>

        {filteredBerita.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBerita.map((berita) => (
              <Link 
                key={berita.id} 
                href={`/berita/${berita.slug}${daerahId ? `?daerah=${daerahId}` : ''}`} 
                className="block"
              >
                <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group h-full">
                  <div className="relative h-40">
                    <Image
                      src={berita.gambar}
                      alt={berita.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md"
                        style={{ backgroundColor: daerah?.warna || '#2563EB' }}
                      >
                        {berita.kategori}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {berita.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {berita.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{berita.penulis}</span>
                      <span>{berita.tanggal}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">
              Tidak Ada Hasil
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Tidak ada berita yang cocok dengan pencarian Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="text-center">
          <h2 className="font-serif text-lg font-bold mb-1">JURNALISTTO</h2>
          <p className="text-xs text-gray-400 mb-2">Menerangi Nusa Cendana</p>
          <p className="text-xs text-gray-500">Copyright @ Jurnalisto 2026</p>
        </div>
      </footer>
    </div>
  );
}
