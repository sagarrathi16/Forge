import { GET } from '@/app/api/templates/route';
import { describe, expect, it } from 'vitest';

describe('Templates API Integration Tests (/api/templates)', () => {
  it('GET returns templates list successfully with 200 OK', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    const first = body.data[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('cliCommand');
  });
});

