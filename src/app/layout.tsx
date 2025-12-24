import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BatikBackground from "@/components/BatikBackground";
import { SITE_NAME, SITE_DESCRIPTION, BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    metadataBase: new URL(BASE_URL),
    openGraph: {
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: BASE_URL,
        siteName: SITE_NAME,
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
    keywords: [
        "Tong-Tong Madura",
        "Budaya Madura",
        "Tradisi Indonesia",
        "Kentongan",
        "Madura Culture",
        "Indonesian Heritage",
        "Bangkalan",
        "Sampang",
        "Pamekasan",
        "Sumenep",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <body className="min-h-screen flex flex-col bg-redBrown-900 text-redBrown-50">
                {/* Batik Pattern Background */}
                <BatikBackground opacity={0.08} />

                {/* Original gradient backgrounds */}
                <div className="fixed inset-0 -z-10 bg-linear-to-br from-redBrown-900 via-redBrown-800 to-redBrown-950" />
                <div className="fixed -z-10 inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,#dc262660,transparent_50%),radial-gradient(circle_at_bottom_right,#7f2d1f60,transparent_50%)]" />

                <Navbar />
                <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
