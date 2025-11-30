import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Tong-Tong Madura Hub",
    description: "Digital hub to preserve and explore Tong-Tong culture in Madura",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <body className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                <div className="fixed -z-10 inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_top,_#b91c1c40,_transparent_55%),_radial-gradient(circle_at_bottom,_#f9731640,_transparent_55%)]" />
                <Navbar />
                <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
