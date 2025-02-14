// app/api/welcome/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      content: {
        message: "Amplify Hosting Compute Role Demo! 🎉"
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to load welcome message'
    }, { 
      status: 500 
    });
  }
}