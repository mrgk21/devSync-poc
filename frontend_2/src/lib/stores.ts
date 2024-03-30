import { writable } from "svelte/store";

export const socketId = writable<undefined | string>(undefined)
export const socketConnected = writable<undefined | boolean>(false)