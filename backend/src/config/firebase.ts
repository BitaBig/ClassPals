import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Only initialize if all required credentials are provided
  if (projectId && clientEmail && privateKey) {
    try {
      // Remove quotes if present and handle newlines
      const cleanPrivateKey = privateKey
        .replace(/^["']|["']$/g, '') // Remove surrounding quotes
        .replace(/\\n/g, '\n'); // Convert \n to actual newlines
      
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: cleanPrivateKey,
        }),
      });
      console.log('✅ Firebase Admin initialized');
    } catch (error: any) {
      console.error('❌ Failed to initialize Firebase Admin:', error.message);
      console.log('⚠️  Firebase authentication will not work until credentials are configured');
    }
  } else {
    console.log('⚠️  Firebase Admin not initialized - missing credentials in .env');
    console.log('   Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY');
  }
}

export default admin;
