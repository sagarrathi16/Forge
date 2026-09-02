/**
 * Supabase / PostgreSQL Database Interface for Forge Waitlist
 * Reads credentials dynamically from process.env without hardcoding.
 */

export interface WaitlistRecord {
  id?: string;
  email: string;
  created_at?: string;
}

// In-memory fallback set for local development or offline testing
const inMemoryWaitlist = new Set<string>();

export async function insertWaitlistEmail(email: string): Promise<{ success: boolean; duplicate?: boolean }> {
  const normalizedEmail = email.toLowerCase().trim();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (response.status === 201 || response.status === 200 || response.ok) {
        return { success: true };
      }

      if (response.status === 409) {
        return { success: false, duplicate: true };
      }

      const errorText = await response.text();
      if (
        errorText.includes('duplicate key') ||
        errorText.includes('23505') ||
        errorText.includes('already exists')
      ) {
        return { success: false, duplicate: true };
      }

      console.error('Supabase REST error:', response.status, errorText);
      throw new Error(`Supabase returned status ${response.status}`);
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  // Fallback if environment variables are missing
  if (inMemoryWaitlist.has(normalizedEmail)) {
    return { success: false, duplicate: true };
  }
  inMemoryWaitlist.add(normalizedEmail);
  return { success: true };
}
