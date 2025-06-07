import { Client, Account, Databases, Functions, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
export { ID };

// Add type declarations
declare module 'appwrite' {
  interface Account {
    createEmailSession(email: string, password: string): Promise<any>;
    deleteSession(sessionId: string): Promise<any>;
    updatePassword(password: string, oldPassword?: string): Promise<any>;
    deleteSessions(): Promise<any>;
    deleteAccount(): Promise<any>;
    updateName(name: string): Promise<any>;
    updateEmail(email: string, password: string): Promise<any>;
    updatePrefs(prefs: any): Promise<any>;
    get(): Promise<any>;
    deleteIdentity(): Promise<any>;
    delete(): Promise<any>;
  }
  interface Databases {
    createDocument(
      databaseId: string,
      collectionId: string,
      documentId: string,
      data: any
    ): Promise<any>;
  }
  interface Functions {
    createExecution(
      functionId: string,
      data?: string,
      xasync?: boolean
    ): Promise<any>;
  }
} 