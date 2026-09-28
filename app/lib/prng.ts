/**
 * Seeded pseudo-random number generation.
 *
 * Every hand-drawn flourish on this site derives from a string seed, so the
 * server and the client always agree on the wobble. Without this, React would
 * re-roll the lines on hydration and every card would visibly twitch.
 */

/** FNV-1a. Turns a human-readable seed like "card:work:2" into a 32-bit int. */
export function hashSeed(seed: string | number): number {
  if (typeof seed === "number") return seed >>> 0;

  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32. Small, fast, good enough for decorative jitter. */
export function createRandom(seed: string | number) {
  let state = hashSeed(seed);

  return function random(): number {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random float in [min, max). */
export function rangeFrom(random: () => number, min: number, max: number): number {
  return min + random() * (max - min);
}

/**
 * Signed jitter in [-amount, amount]. Most hand-drawn irregularity is
 * symmetric around zero, so this is the workhorse.
 */
export function jitter(random: () => number, amount: number): number {
  return (random() * 2 - 1) * amount;
}
