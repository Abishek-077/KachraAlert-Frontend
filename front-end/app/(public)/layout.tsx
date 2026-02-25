import Header from "./_components/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="motion-swipe-track relative min-h-screen overflow-x-hidden kachra-bg">
            <Header />
            <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 motion-reveal-target">{children}</main>
        </div>
    );
}
