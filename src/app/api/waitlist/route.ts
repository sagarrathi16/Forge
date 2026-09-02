import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/lib/validation';
import { insertWaitlistEmail } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body || {};

    // Server-side validation
    const validation = validateEmail(email);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Storage and Duplicate check
    const result = await insertWaitlistEmail(email);
    if (result.duplicate) {
      return NextResponse.json(
        { success: false, error: 'This email address is already on the waitlist.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'You have been successfully added to the waitlist!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
