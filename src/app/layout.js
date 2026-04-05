import './globals.css';

export const metadata = {
  title: 'Jurnalisto - Berita Terpercaya NTT',
  description: 'Portal berita terpercaya Nusa Tenggara Timur',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="m-0 p-0">
        {children}
      </body>
    </html>
  );
}
