"use client";
import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
function subscribe(notify: () => void) {
    const media = matchMedia("(prefers-color-scheme: dark)");
    window.addEventListener("storage", notify);
    window.addEventListener("beyondai-theme-change", notify);
    media.addEventListener("change", notify);
    return () => { window.removeEventListener("storage", notify); window.removeEventListener("beyondai-theme-change", notify); media.removeEventListener("change", notify); };
}
function snapshot() { try {
    const value = localStorage.getItem("beyondai-theme");
    return value ? value === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}
catch {
    return matchMedia("(prefers-color-scheme: dark)").matches;
} }
export function Preferences({ english }: {
    english: boolean;
}) {
    const dark = useSyncExternalStore(subscribe, snapshot, () => false);
    useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
    return <button className="icon-button" aria-label={english ? "Dark theme" : "Tema escuro"} aria-pressed={dark} onClick={() => { try {
        localStorage.setItem("beyondai-theme", dark ? "light" : "dark");
        window.dispatchEvent(new Event("beyondai-theme-change"));
    }
    catch {
        document.documentElement.dataset.theme = dark ? "light" : "dark";
    } }}>{dark ? <Sun size={20}/> : <Moon size={20}/>}</button>;
}

