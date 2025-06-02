import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };

// Add type declarations
declare module 'appwrite' {
  interface Account {
    createEmailPasswordSession(email: string, password: string): Promise<any>;
    deleteSession(sessionId: string): Promise<any>;
  }
  interface Databases {
    createDocument(
      databaseId: string,
      collectionId: string,
      documentId: string,
      data: any
    ): Promise<any>;
  }
} 