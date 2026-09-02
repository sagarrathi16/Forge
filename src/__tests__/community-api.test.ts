import { GET, POST } from '@/app/api/community/route';
import { describe, expect, it } from 'vitest';

describe('Community API Integration Tests (/api/community)', () => {
  it('GET returns community projects, testimonials, and stats successfully', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data.projects)).toBe(true);
    expect(body.data.projects.length).toBeGreaterThan(0);
    expect(Array.isArray(body.data.testimonials)).toBe(true);
    expect(body.data.stats).toHaveProperty('projectsBuilt');
  });

  it('POST returns 400 when reaction payload is missing required fields', async () => {
    const req = new Request('http://localhost:3000/api/community', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('Invalid reaction payload');
  });

  it('POST updates star reaction successfully for an existing project', async () => {
    const req = new Request('http://localhost:3000/api/community', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: '1', type: 'star', delta: 1 }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

