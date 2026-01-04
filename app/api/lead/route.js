import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  const payload = {
    name: formData.get('name') || '',
    email: formData.get('email') || '',
    message: formData.get('message') || '',
  };

  // Placeholder: integrate Webform3 + autoresponder via secrets
  console.log('Lead captured', payload);

  return NextResponse.redirect(new URL('/services?lead=success#contact', request.url));
}
