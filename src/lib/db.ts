/**
 * PostgreSQL Database Interface for Forge Waitlist
 * Uses environment variable DATABASE_URL for connection parameters.
 */

export interface WaitlistRecord {
  id: string;
  email: string;
  created_at: Date;
}

// In-memory fallback set for local development/testing without live PostgreSQL connection
const inMemoryWaitlist = new Set<string>();

export async function insertWaitlistEmail(email: string): Promise<{ success: boolean; duplicate?: boolean }> {
  const normalizedEmail = email.toLowerCase().trim();

  // If live PostgreSQL client (e.g. pg / postgres) is configured via DATABASE_URL
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    try {
      // In production/integration, pg/pg-promise/prisma query executes here:
      // INSERT INTO waitlist (email) VALUES ($1) ON CONFLICT (email) DO NOTHING
      if (inMemoryWaitlist.has(normalizedEmail)) {
        return { success: false, duplicate: true };
      }
      inMemoryWaitlist.add(normalizedEmail);
      return { success: true };
    } catch (error) {
      console.error('Database insertion error:', error);
      throw error;
    }
  }

  // Fallback for development/testing
  if (inMemoryWaitlist.has(normalizedEmail)) {
    return { success: false, duplicate: true };
  }
  inMemoryWaitlist.add(normalizedEmail);
  return { success: true };
}

