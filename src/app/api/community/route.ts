import { getCommunityProjects, getCommunityStats, getTestimonials, updateProjectReaction } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [projects, testimonials, stats] = await Promise.all([
      getCommunityProjects(),
      getTestimonials(),
      getCommunityStats(),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          projects,
          testimonials,
          stats,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching community data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch community data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, type, delta } = body;

    if (!projectId || (type !== 'star' && type !== 'upvote') || typeof delta !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid reaction payload' },
        { status: 400 }
      );
    }

    const updated = await updateProjectReaction(projectId, type, delta);

    return NextResponse.json(
      { success: updated },
      { status: updated ? 200 : 500 }
    );
  } catch (error) {
    console.error('Error updating reaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update reaction' },
      { status: 500 }
    );
  }
}

