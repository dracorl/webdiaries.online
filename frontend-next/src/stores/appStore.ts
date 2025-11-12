import {create} from "zustand"

interface AppStore {
  hostnamePrefix: string
  setHostnamePrefix: (prefix: string) => void
  author: string
  setAuthor: (id: string) => void
  isLeftDrawerOpen: boolean
  setLeftDrawerOpen: (open: boolean) => void
  toggleLeftDrawer: () => void
}

export const useAppStore = create<AppStore>(set => ({
  hostnamePrefix: "",
  setHostnamePrefix: prefix => set({hostnamePrefix: prefix}),
  author: "",
  setAuthor: id => set({author: id}),
  isLeftDrawerOpen: false,
  setLeftDrawerOpen: open => set({isLeftDrawerOpen: open}),
  toggleLeftDrawer: () =>
    set(state => ({isLeftDrawerOpen: !state.isLeftDrawerOpen}))
}))
