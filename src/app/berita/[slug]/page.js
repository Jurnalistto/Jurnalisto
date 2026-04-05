import Link from 'next/link';
import Image from 'next/image';
import { getBeritaBySlug, getLatestBerita } from '../../../data/berita';
import { getDaerahData } from '../../../lib/daerah';

export default function BeritaDetail({ params, searchParams }) {
  const berita = getBeritaBySlug(params.slug);
  const daerahId = searchParams?.daerah || null;
  const daerah = daerahId ? getDaerahData(daerahId) : null;
  
  if (!berita) {
    return <div className="min-h-screen flex items-center justify-center">Berita tidak ditemukan</div>;
  }

  const otherNews = getLatestBerita()
    .filter((item) => item.id !== berita.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <span className="text-lg">←</span>
              <span className="text-sm font-medium">Kembali</span>
            </Link>
            {daerah && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 rounded-full" style={{ backgroundColor: daerah.warna }} />
                <span className="text-sm font-medium" style={{ color: daerah.warna }}>
                  {daerah.nama}
                </span>
              </div>
            )}
          </div>
        </div>

        <article className="py-6 px-4">
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="px-3 py-1 text-xs font-bold text-white rounded-full"
                style={{ backgroundColor: daerah?.warna || '#2563EB' }}
              >
                {berita.kategori}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{berita.tanggal}</span>
            </div>
            
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {berita.title}
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {berita.excerpt}
            </p>
            
            <div className="flex items-center gap-4 py-4 border-y border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {berita.penulis.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{berita.penulis}</p>
                  <p className="text-xs text-gray-500">Penulis</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4 text-xs text-gray-400">
                <span>📖 5 menit baca</span>
                <span>👁️ 1.2K views</span>
              </div>
            </div>
          </header>

          <figure className="mb-8">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={berita.gambar}
                alt={berita.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="text-xs text-gray-500 mt-2 text-center">
              Ilustrasi - {berita.kategori}
            </figcaption>
          </figure>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-4 text-[17px]">
              {berita.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-justify">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-sm text-gray-600 font-medium">Tags:</span>
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full text-white"
                style={{ backgroundColor: daerah?.warna || '#2563EB' }}
              >
                {berita.kategori}
              </span>
              {daerah && (
                <span className="px-3 py-1 text-xs font-medium rounded-full text-white" style={{ backgroundColor: daerah.warna }}>
                  {daerah.nama}
                </span>
              )}
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-3">Bagikan artikel ini:</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="px-4 py-2 bg-sky-500 text-white text-xs font-medium rounded-lg hover:bg-sky-600 transition-colors">
                  Twitter
                </button>
                <button className="px-4 py-2 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </article>

        {otherNews.length > 0 && (
          <section className="bg-gray-100 py-8 px-4">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              BERITA LAINNYA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherNews.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/berita/${item.slug}${daerahId ? `?daerah=${daerahId}` : ''}`} 
                  className="block"
                >
                  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                    <div className="relative h-36">
                      <Image
                        src={item.gambar}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span 
                        className="inline-block px-2 py-0.5 text-[10px] font-bold text-white rounded mb-2"
                        style={{ backgroundColor: daerah?.warna || '#2563EB' }}
                      >
                        {item.kategori}
                      </span>
                      <h3 className="font-serif text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2">{item.tanggal}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="text-center">
          <h2 className="font-serif text-lg font-bold mb-1">Jurnalisto</h2>
          <p className="text-xs text-gray-400 mb-2">Menerangi Nusa Cendana</p>
          <p className="text-xs text-gray-500">Copyright @ Jurnalisto 2026</p>
        </div>
      </footer>
    </div>
  );
}
