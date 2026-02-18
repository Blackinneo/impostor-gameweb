/**
 * @file src/types/index.ts
 * @description Shared TypeScript type definitions for the Impostor GameWeb application.
 * All domain models and API response shapes are defined here.
 */

// ─────────────────────────────────────────────
// Auth & User
// ─────────────────────────────────────────────

/** Roles available in the application */
export type UserRole = 'player' | 'host' | 'admin';

/**
 * Represents an authenticated user in the system.
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

// ─────────────────────────────────────────────
// Game Session
// ─────────────────────────────────────────────

/** Possible states of a game session */
export type GameStatus = 'lobby' | 'in_progress' | 'voting' | 'finished';

/**
 * Represents a player inside a game session.
 */
export interface Player {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  isImpostor: boolean;
  isAlive: boolean;
  score: number;
}

/**
 * Represents a full game session.
 */
export interface GameSession {
  id: string;
  code: string;
  hostId: string;
  status: GameStatus;
  players: Player[];
  maxPlayers: number;
  impostorCount: number;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
}

// ─────────────────────────────────────────────
// API Responses
// ─────────────────────────────────────────────

/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────

/**
 * Root stack navigator param list.
 * Add new screens here as the app grows.
 */
export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Profile: { userId: string };
  Lobby: { sessionId: string };
  Game: { sessionId: string };
};
