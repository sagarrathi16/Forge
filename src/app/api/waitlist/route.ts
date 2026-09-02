import { insertWaitlistEmail, getWaitlistCount } from '@/lib/db';
import { validateEmail } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json(
      { success: true, count },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist GET count error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch waitlist count' },
      { status: 500 }
    );
  }
}

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

    const currentCount = await getWaitlistCount();

    return NextResponse.json(
      {
        success: true,
        count: currentCount,
        position: currentCount,
        message: `You're #${currentCount} on the waitlist! We'll reach out soon.`,
      },
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
