import "./globals.css";

export const metadata = {
  title: "17lands Visual Data",
  description: "Card Ranking from 17 lands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
