const daerahData = {
  'alor': { 
    nama: 'Kabupaten Alor', 
    tagline: 'Surga Bawah Laut NTT',
    warna: '#1E40AF',
    warnaHover: '#1E3A8A',
    deskripsi: 'Kabupaten Kepulauan dengan Kekayaan Bahari'
  },
  'belu': { 
    nama: 'Kabupaten Belu', 
    tagline: 'Gerbang Timor NTT',
    warna: '#059669',
    warnaHover: '#047857',
    deskripsi: 'Lumbung Padi Timor NTT'
  },
  'ende': { 
    nama: 'Kabupaten Ende', 
    tagline: 'Tanah K紅 Poet',
    warna: '#DC2626',
    warnaHover: '#B91C1C',
    deskripsi: 'Museumwo Boats untuk Bung Karno'
  },
  'flores-timur': { 
    nama: 'Kabupaten Flores Timur', 
    tagline: 'Wajar Timur yang Islami',
    warna: '#7C3AED',
    warnaHover: '#6D28D9',
    deskripsi: 'Wilayah Adat Lamaholot'
  },
  'lembata': { 
    nama: 'Kabupaten Lembata', 
    tagline: 'Koli Koli Laut',
    warna: '#0891B2',
    warnaHover: '#0E7490',
    deskripsi: 'Penghasil Gandum dari Laut'
  },
  'malaka': { 
    nama: 'Kabupaten Malaka', 
    tagline: 'Tanah Lerah Male',
    warna: '#D97706',
    warnaHover: '#B45309',
    deskripsi: 'Sejarah Perang Pattimura'
  },
  'manggarai': { 
    nama: 'Kabupaten Manggarai', 
    tagline: 'Tanah Komodo',
    warna: '#65A30D',
    warnaHover: '#4D7C0F',
    deskripsi: 'Rumah Adat Mbaru Niung'
  },
  'manggarai-barat': { 
    nama: 'Kabupaten Manggarai Barat', 
    tagline: 'Destinasi Dunia',
    warna: '#16A34A',
    warnaHover: '#15803D',
    deskripsi: 'Pulau Komodo & Rinca'
  },
  'manggarai-timur': { 
    nama: 'Kabupaten Manggarai Timur', 
    tagline: 'Kekayaan Alam Flores',
    warna: '#0D9488',
    warnaHover: '#0F766E',
    deskripsi: 'Benteng Liang Ndeng'
  },
  'ngada': { 
    nama: 'Kabupaten Ngada', 
    tagline: 'Tanah Bena',
    warna: '#EA580C',
    warnaHover: '#C2410C',
    deskripsi: 'Ritual Gereja Mbaru Niung'
  },
  'nagekeo': { 
    nama: 'Kabupaten Nagekeo', 
    tagline: 'Danau Tambur',
    warna: '#2563EB',
    warnaHover: '#1D4ED8',
    deskripsi: 'Laut Biru Nan jernih'
  },
  'rote-ndao': { 
    nama: 'Kabupaten Rote Ndao', 
    tagline: 'Pantai Terpanjang',
    warna: '#06B6D4',
    warnaHover: '#0891B2',
    deskripsi: 'Pantai Terpanjang di NTT'
  },
  'sabu-raijua': { 
    nama: 'Kabupaten Sabu Raijua', 
    tagline: 'Pulau Sabu',
    warna: '#8B5CF6',
    warnaHover: '#7C3AED',
    deskripsi: 'Budaya Sasando'
  },
  'sikka': { 
    nama: 'Kabupaten Sikka', 
    tagline: 'Ikat Tenun Maasemo',
    warna: '#E11D48',
    warnaHover: '#BE123C',
    deskripsi: 'Pusat Tenun Ikat NTT'
  },
  'sumba-barat': { 
    nama: 'Kabupaten Sumba Barat', 
    tagline: 'Padang Savana',
    warna: '#CA8A04',
    warnaHover: '#A16207',
    deskripsi: 'Kuda Sandel Sumba'
  },
  'sumba-barat-daya': { 
    nama: 'Kabupaten Sumba Barat Daya', 
    tagline: 'Pesona Barat Daya',
    warna: '#F59E0B',
    warnaHover: '#D97706',
    deskripsi: 'Pantai eksotis Barat Daya'
  },
  'sumba-tengah': { 
    nama: 'Kabupaten Sumba Tengah', 
    tagline: 'Tradisi Marapu',
    warna: '#92400E',
    warnaHover: '#78350F',
    deskripsi: 'Situs megalitikum'
  },
  'sumba-timur': { 
    nama: 'Kabupaten Sumba Timur', 
    tagline: 'Bumi Tambur',
    warna: '#B45309',
    warnaHover: '#92400E',
    deskripsi: 'Kuda Sandel & Pasola'
  },
  'timor-tengah-selatan': { 
    nama: 'Kabupaten Timor Tengah Selatan', 
    tagline: 'Berasro Timor',
    warna: '#4F46E5',
    warnaHover: '#4338CA',
    deskripsi: 'Lumbung Padi NTT'
  },
  'timor-tengah-utara': { 
    nama: 'Kabupaten Timor Tengah Utara', 
    tagline: 'Batas Timor',
    warna: '#7DD3FC',
    warnaHover: '#38BDF8',
    deskripsi: 'Batas Timur Indonesia'
  },
  'kupang-kota': { 
    nama: 'Kota Kupang', 
    tagline: 'Ibu Kota NTT',
    warna: '#1E40AF',
    warnaHover: '#1E3A8A',
    deskripsi: 'Pintu Gerbang Indonesia Timur'
  },
  'kupang-kab': { 
    nama: 'Kabupaten Kupang', 
    tagline: 'Wilayah Perbatasan',
    warna: '#3B82F6',
    warnaHover: '#2563EB',
    deskripsi: 'Kabupaten di Sekitar Kota Kupang'
  },
};

export function getDaerahData(id) {
  return daerahData[id] || null;
}

export function getAllDaerah() {
  const all = Object.entries(daerahData).map(([id, data]) => ({
    id,
    ...data
  }));
  
  return all.sort((a, b) => {
    if (a.id === 'kupang-kota') return -1;
    if (b.id === 'kupang-kota') return 1;
    return a.nama.localeCompare(b.nama);
  });
}

export default daerahData;
