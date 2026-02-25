export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="motion-swipe-track relative min-h-screen overflow-hidden kachra-bg">
            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12 motion-reveal-target">
                {children}
            </div>
        </div>
    );
}
