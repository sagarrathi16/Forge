import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { POST } from '../app/api/waitlist/route';

describe('Waitlist API Route Integration Tests', () => {
  it('should return 400 Bad Request when email is missing in request body', async () => {
    const req = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Email address is required.');
  });

  it('should return 400 Bad Request when email format is invalid', async () => {
    const req = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email' }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Please enter a valid email address.');
  });

  it('should return 201 Created on valid email submission', async () => {
    const uniqueEmail = `test.user.${Date.now()}@example.com`;
    const req = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: uniqueEmail }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.message).toBe('You have been successfully added to the waitlist!');
  });

  it('should return 409 Conflict when submitting a duplicate email address', async () => {
    const duplicateEmail = `duplicate.${Date.now()}@example.com`;

    // First submission -> 201
    const req1 = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: duplicateEmail }),
    });
    const res1 = await POST(req1);
    expect(res1.status).toBe(201);

    // Second submission with same email -> 409 Conflict
    const req2 = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: duplicateEmail }),
    });
    const res2 = await POST(req2);
    const data2 = await res2.json();

    expect(res2.status).toBe(409);
    expect(data2.success).toBe(false);
    expect(data2.error).toBe('This email address is already on the waitlist.');
  });
});

