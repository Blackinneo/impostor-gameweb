/**
 * @file src/utils/index.ts
 * @description Common utility functions for Impostor GameWeb.
 */

/**
 * Generates a random 6-character alphanumeric game code.
 * @returns {string} Uppercase game code, e.g. "AB3X7Q"
 */
export function generateGameCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}

/**
 * Formats an ISO date string to a human-readable relative time.
 * @param {string} isoDate - ISO 8601 date string
 * @returns {string} e.g. "2 minutes ago"
 */
export function timeAgo(isoDate: string): string {
    const diff = Date.now() - new Date(isoDate).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

/**
 * Truncates a string to a given max length, appending "…" if needed.
 * @param {string} str - Input string
 * @param {number} maxLength - Maximum character count
 * @returns {string} Truncated string
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 1) + '…';
}

/**
 * Returns initials from a display name (up to 2 characters).
 * @param {string} name - Full display name
 * @returns {string} e.g. "JD" for "John Doe"
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? '')
        .join('');
}

/**
 * Delays execution for a given number of milliseconds.
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamps a number between min and max bounds.
 * @param {number} value - Input value
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
