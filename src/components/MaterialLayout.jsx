import Header from "./Header";
import Footer from "./Footer";

export default function MaterialLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-100">
                {children}
            </main>
            <Footer />
        </div>
    );
}
