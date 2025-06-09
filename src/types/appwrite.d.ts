declare module 'appwrite' {
  export class Client {
    setEndpoint(endpoint: string): this;
    setProject(project: string): this;
  }

  export class ID {
    static unique(): string;
    static custom(id: string): string;
  }

  export class Account {
    create(arg0: any, email: string, password: string, name: string) {
      throw new Error("Method not implemented.");
    }
    constructor(client: Client);
    getSession(sessionId: string): Promise<any>;
    get(): Promise<any>;
    deleteSession(sessionId: string): Promise<any>;
    createEmailSession(email: string, password: string): Promise<any>;
  }

  export class Databases {
    constructor(client: Client);
    listDocuments(
      databaseId: string,
      collectionId: string,
      queries?: any[]
    ): Promise<{ documents: any[] }>;
  }

  export class Functions {
    constructor(client: Client);
  }

  export class Query {
    static equal(attribute: string, value: any): string;
    static orderDesc(attribute: string): string;
    static limit(limit: number): string;
  }
} 