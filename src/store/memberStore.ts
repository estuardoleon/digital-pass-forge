import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Member {
  id: string;
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  tier: string;
  points: number;
  gender: string;
  dateCreated: string;
  expiryDate: string;
  dateOfBirth?: string;
}

interface MemberStore {
  miembros: Member[];
  addMiembro: (miembro: Member) => void;
  updateMiembro: (id: string, datosActualizados: Partial<Member>) => void;
  deleteMiembro: (id: string) => void;
  clearMiembros: () => void;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      miembros: [],

      addMiembro: (miembro) =>
        set((state) => ({
          miembros: [...state.miembros, miembro],
        })),

      updateMiembro: (id, datosActualizados) =>
        set((state) => ({
          miembros: state.miembros.map((m) =>
            m.id === id ? { ...m, ...datosActualizados } : m
          ),
        })),

      deleteMiembro: (id) =>
        set((state) => ({
          miembros: state.miembros.filter((m) => m.id !== id),
        })),

      clearMiembros: () => set({ miembros: [] }),
    }),
    {
      name: 'miembros-storage', // Este es el nombre que verás en el Local Storage
    }
  )
);
