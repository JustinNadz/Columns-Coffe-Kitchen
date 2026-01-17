import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favoriteIds: string[];
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteIds: [],

            toggleFavorite: (productId) => {
                set((state) => {
                    const isFav = state.favoriteIds.includes(productId);
                    return {
                        favoriteIds: isFav
                            ? state.favoriteIds.filter(id => id !== productId)
                            : [...state.favoriteIds, productId]
                    };
                });
            },

            isFavorite: (productId) => {
                return get().favoriteIds.includes(productId);
            },

            clearFavorites: () => {
                set({ favoriteIds: [] });
            },
        }),
        {
            name: 'favorites-storage',
        }
    )
);
