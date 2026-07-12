"use client";

import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

import Button from "@/components/ui/Button";

import { navigation } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { mode, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">

      <nav className="mx-auto mt-5 flex h-16 w-[95%] max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 backdrop-blur-xl">

        <a
          href="#hero"
          className="text-xl font-black"
        >
          JS
        </a>

        <div className="hidden gap-8 md:flex">

          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:opacity-60"
            >
              {item.label}
            </a>
          ))}

        </div>

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >

            {mode === "dreamer" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}

          </Button>

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden"
          >

            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </div>

      </nav>

      {menuOpen && (

        <div className="mx-auto mt-3 flex w-[95%] max-w-7xl flex-col rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl md:hidden">

          {navigation.map((item) => (

            <a
              key={item.label}
              href={item.href}
              className="py-3"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              {item.label}
            </a>

          ))}

        </div>

      )}

    </header>
  );
}