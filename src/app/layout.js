import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "NoCandy Film",
  description: "noCandy Official Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white overflow-x-hidden">
        <Header/>
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
