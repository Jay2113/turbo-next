import { S3Client, GetObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = 'amplify-compute-role-demo';
const IMAGE_KEY = 'amplify-logo.png';

export async function GET() {
  console.log(`[S3 Image Request] Starting - Bucket: ${BUCKET_NAME}, Key: ${IMAGE_KEY}`);
  
  try {
    console.log('[S3 Image Request] Creating GetObjectCommand...');
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: IMAGE_KEY
    });

    console.log('[S3 Image Request] Sending request to S3...');
    const response = await s3Client.send(command);
    console.log('[S3 Image Request] Received S3 response:', {
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      metadata: response.Metadata
    });

    console.log('[S3 Image Request] Converting response to byte array...');
    const buffer = await response.Body?.transformToByteArray();

    if (!buffer) {
      console.error('[S3 Image Request] No buffer received from S3');
      throw new Error('No image data received from S3');
    }

    console.log('[S3 Image Request] Successfully processed image:', {
      bufferSize: buffer.length,
      contentType: response.ContentType
    });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.ContentType || 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });

  } catch (error) {
    if (error instanceof S3ServiceException) {
      console.error('[S3 Image Request] AWS S3 Error:', {
        message: error.message,
        code: error.name,
        requestId: error.$metadata?.requestId,
        statusCode: error.$metadata?.httpStatusCode
      });
    } else {
      console.error('[S3 Image Request] Unexpected error:', error);
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to load content'
    }, { 
      status: 500 
    });
  } finally {
    console.log('[S3 Image Request] Request completed');
  }
}