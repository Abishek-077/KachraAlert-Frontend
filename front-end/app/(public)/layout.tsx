import Header from "./_components/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-x-hidden kachra-bg">
            <Header />
            <main className="relative z-10 mx-auto max-w-[1220px] px-4 pb-24 pt-8">{children}</main>
        </div>
    );
}
