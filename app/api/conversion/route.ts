import { NextResponse } from 'next/server';
import { convertData } from '../../../lib/dataConversionService';

export async function POST(request: Request) {
  try {
    const { data, format } = await request.json();
    const convertedData = await convertData(data, format);
    return NextResponse.json({ convertedData });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
