'use client';

import { useRouter } from 'next/navigation';
import { getAllDaerah } from '../lib/daerah';

export default function Header() {
  const router = useRouter();
  const daerahList = getAllDaerah();

  const getLabel = (nama) => {
    const parts = nama.split(' ');
    const prefix = parts[0];
    const name = parts.slice(1).join(' ');
    return { prefix, name };
  };

  const handleDaerahClick = (daerah) => {
    router.push(`/home?daerah=${daerah.id}`);
  };

  const row1 = daerahList.slice(0, 11);
  const row2 = daerahList.slice(11, 22);
  const row3 = daerahList.slice(22);

  return (
    <div className="bg-white border-b border-blue-300">
      <div className="text-center py-2">
        <h1 className="font-serif text-lg md:text-xl font-bold text-blue-600 tracking-tight">
          JURNALISTTO
        </h1>
        <p className="text-xs text-gray-500">Menerangi Nusa Cendana</p>
      </div>
      
      <div className="px-2 pb-1 space-y-0.5">
        <div className="flex justify-between">
          {row1.map((daerah) => {
            const { prefix, name } = getLabel(daerah.nama);
            return (
              <button
                key={daerah.id}
                onClick={() => handleDaerahClick(daerah)}
                className="bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 px-1 py-1 rounded text-center transition-all duration-150 flex flex-col items-center justify-center"
                style={{ width: 'calc(100% / 11 - 2px)', height: '44px' }}
              >
                <span className="text-[7px] block leading-tight">{prefix}</span>
                <span className="font-bold text-[11px] block leading-tight">{name}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between">
          {row2.map((daerah) => {
            const { prefix, name } = getLabel(daerah.nama);
            return (
              <button
                key={daerah.id}
                onClick={() => handleDaerahClick(daerah)}
                className="bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 px-1 py-1 rounded text-center transition-all duration-150 flex flex-col items-center justify-center"
                style={{ width: 'calc(100% / 11 - 2px)', height: '44px' }}
              >
                <span className="text-[7px] block leading-tight">{prefix}</span>
                <span className="font-bold text-[11px] block leading-tight">{name}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between">
          {row3.map((daerah) => {
            const { prefix, name } = getLabel(daerah.nama);
            return (
              <button
                key={daerah.id}
                onClick={() => handleDaerahClick(daerah)}
                className="bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 px-1 py-1 rounded text-center transition-all duration-150 flex flex-col items-center justify-center"
                style={{ width: 'calc(100% / 11 - 2px)', height: '44px' }}
              >
                <span className="text-[7px] block leading-tight">{prefix}</span>
                <span className="font-bold text-[11px] block leading-tight">{name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
