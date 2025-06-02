declare module 'appwrite' {
  export class Client {
    setEndpoint(endpoint: string): this;
    setProject(project: string): this;
  }

  export class Account {
    constructor(client: Client);
    getSession(sessionId: string): Promise<any>;
    get(): Promise<any>;
    deleteSession(sessionId: string): Promise<any>;
  }

  export class Databases {
    constructor(client: Client);
    listDocuments(
      databaseId: string,
      collectionId: string,
      queries?: any[]
    ): Promise<{ documents: any[] }>;
  }

  export class Query {
    static equal(attribute: string, value: any): string;
    static orderDesc(attribute: string): string;
    static limit(limit: number): string;
  }
} 