"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { DynamicIcon } from "@/lib/DynamicIcon";
import { searchIcons } from "@/lib/iconList";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const results = searchIcons(query);

  const handleSelect = useCallback(
    (iconName: string) => {
      onChange(iconName);
      setIsOpen(false);
      setQuery("");
    },
    [onChange],
  );

  const DROPDOWN_HEIGHT = 340; // approx height of search + icon grid

  // Calculate dropdown position when opening
  const calcPosition = useCallback(() => {
    if (!triggerRef.current) return { top: 0, left: 0 };
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const fitsBelow = spaceBelow >= DROPDOWN_HEIGHT + 8;
    return {
      top: fitsBelow ? rect.bottom + 8 : rect.top - DROPDOWN_HEIGHT - 8,
      left: rect.left,
    };
  }, []);

  const openDropdown = useCallback(() => {
    setDropdownPos(calcPosition());
    setIsOpen(true);
  }, [calcPosition]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setQuery("");
    } else {
      openDropdown();
    }
  }, [isOpen, openDropdown]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reposition on scroll/resize while open
  useEffect(() => {
    if (!isOpen) return;

    function reposition() {
      setDropdownPos(calcPosition());
    }

    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const dropdown = isOpen
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left }}
          className="z-[9999] w-72 rounded-lg border border-neutral-200 bg-white shadow-lg"
        >
          {/* Search input */}
          <div className="border-b border-neutral-100 p-2">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons..."
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-jetbrains text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-200"
            />
          </div>

          {/* Icon grid */}
          <div className="max-h-[300px] overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="py-6 text-center font-inter text-sm text-neutral-400">
                No icons found
              </p>
            ) : (
              <div className="grid grid-cols-6 gap-1">
                {results.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSelect(name)}
                    title={name}
                    className={`group relative flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                      name === value
                        ? "bg-cyan-100 text-cyan-700"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <DynamicIcon name={name} size={18} />
                    {/* Tooltip */}
                    <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-800 px-2 py-1 font-jetbrains text-[10px] text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                      {name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="relative inline-block">
      {label && (
        <label className="mb-1 block font-space-grotesk text-xs font-medium text-neutral-600">
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleDropdown}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-300 hover:bg-neutral-50"
        aria-label={`Selected icon: ${value}. Click to change.`}
      >
        <DynamicIcon name={value} size={24} className="text-neutral-700" />
      </button>

      {dropdown}
    </div>
  );
}
