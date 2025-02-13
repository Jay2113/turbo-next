import { S3Client, GetObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'amplify-compute-role-demo';
const WELCOME_FILE_KEY = 'welcome-message.json';

interface WelcomeContent {
  message: string;
  imageUrl?: string;
}

export async function GET() {
  try {
    console.log('Fetching welcome content from S3...');
    
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: WELCOME_FILE_KEY
    });

    const response = await s3Client.send(command);
    
    if (!response.Body) {
      throw new Error('No content received from S3');
    }

    // Convert stream to string
    const bodyContents = await response.Body.transformToString();
    const welcomeContent: WelcomeContent = JSON.parse(bodyContents);

    console.log('Successfully retrieved welcome content');

    // Return the welcome content with HTML formatting
    return NextResponse.json({
      success: true,
      content: welcomeContent,
      html: `
        <div class="welcome-message">
          <h1>${welcomeContent.message}</h1>
          ${welcomeContent.imageUrl ? `<img src="${welcomeContent.imageUrl}" alt="Welcome image" />` : ''}
        </div>
      `
    });

  } catch (error) {
    if (error instanceof S3ServiceException) {
      console.error('AWS S3 error:', {
        message: error.message,
        code: error.name,
        requestId: error.$metadata?.requestId
      });
      
      return NextResponse.json({
        success: false,
        error: `${error.name}: ${error.message}`
      }, { 
        status: 500 
      });
    }

    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred'
    }, { 
      status: 500 
    });
  }
}