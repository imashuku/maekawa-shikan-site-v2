"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "オンライン", href: "/online" },
  { label: "リアル", href: "/real" },
  { label: "前川真司", href: "/profile" },
  { label: "物語", href: "/#stories" },
  { label: "出版への道", href: "/publication" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sumi/15 bg-kinari/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-6">
        <Link
          href="/"
          className="relative z-50 flex items-baseline gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-serif text-xl font-bold tracking-[0.16em] text-sumi-dark md:text-2xl">
            前川史観
          </span>
          <span className="hidden text-[10px] tracking-wider text-sumi/55 lg:inline">
            それはまことですか？｜前川真司
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-transparent pb-1 transition-colors hover:border-kokihi hover:text-kokihi"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span
            className={`h-px w-6 bg-sumi-dark transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-sumi-dark transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-sumi-dark transition-transform ${
              isOpen ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>

        <div
          id="mobile-navigation"
          className={`fixed inset-0 z-40 flex min-h-screen flex-col bg-kinari px-8 pt-28 transition-opacity md:hidden ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <p className="mb-8 text-xs tracking-[0.22em] text-kokihi">
            それはまことですか？｜前川真司
          </p>
          <nav className="flex flex-col border-t border-sumi/15">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-sumi/15 py-5 font-serif text-xl font-bold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
