import Link from "next/link";
import { Leaf } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="relative z-40 mx-auto max-w-[1220px] px-4 pt-7">
            <div className="flex items-center justify-between rounded-[1.2rem] border border-slate-200/80 bg-white/[0.82] px-6 py-4 shadow-[0_8px_26px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
                <Link 
                    href="/" 
                    className="flex items-center gap-3"
                >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-[0_8px_20px_rgba(16,185,129,0.28)]">
                        <Leaf size={19} />
                    </span>
                    <span className="text-[1.85rem] font-extrabold leading-none tracking-tight text-slate-900 dark:text-white sm:text-[2rem]">KacharaAlert</span>
                </Link>

                <nav className="hidden items-center gap-3.5 md:flex">
                    <Link
                        href="/dashboard"
                        className="rounded-xl px-4 py-2 text-[1rem] font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/about"
                        className="rounded-xl px-4 py-2 text-[1rem] font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        About
                    </Link>
                    <Link
                        href="/login"
                        className="rounded-xl px-4 py-2 text-[1rem] font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-xl bg-brand-500 px-6 py-2.5 text-[1rem] font-semibold text-white shadow-[0_8px_18px_rgba(16,185,129,0.28)] transition-colors hover:bg-brand-600"
                    >
                        Get Started
                    </Link>
                    <ThemeToggle />
                </nav>
                <div className="flex items-center gap-2 md:hidden">
                    <Link
                        href="/login"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                        Login
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
