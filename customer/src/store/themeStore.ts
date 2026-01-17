import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'system',
            resolvedTheme: 'light',

            setTheme: (theme) => {
                let resolved: 'light' | 'dark' = 'light';

                if (theme === 'system') {
                    resolved = typeof window !== 'undefined' &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';
                } else {
                    resolved = theme;
                }

                set({ theme, resolvedTheme: resolved });

                // Apply to document
                if (typeof document !== 'undefined') {
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(resolved);
                }
            },
        }),
        {
            name: 'theme-storage',
        }
    )
);
