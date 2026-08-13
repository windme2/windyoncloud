import type Lenis from "lenis";

/** Shared Lenis instance so anchors/buttons can scroll through the same smoother. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};
export const getLenis = () => instance;
