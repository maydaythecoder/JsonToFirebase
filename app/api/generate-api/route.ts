import { NextResponse } from 'next/server';
import { generateApi } from '../../../lib/apiTemplateService';

export async function POST(request: Request) {
  try {
    const { data, language } = await request.json();
    const apiCode = await generateApi(data, language);
    return NextResponse.json({ apiCode });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
