import { getTemplates } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const templates = await getTemplates();
    return NextResponse.json(
      {
        success: true,
        data: templates,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

