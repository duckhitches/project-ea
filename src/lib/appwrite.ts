/**
 * Copyright (c) 2025 Eshan Vijay Shettennavar
 * 
 * This file is licensed under the Business Source License 1.1.
 * See LICENSE-BUSL-1.1.txt in the root directory for details.
 * 
 * Use of this software is governed by the Business Source License.
 * Change Date: February 4, 2029
 * Change License: Apache License 2.0
 */

import { Client, Account, Databases, Functions, ID } from "appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")

export const account = new Account(client)
export const databases = new Databases(client)
export const functions = new Functions(client)
export { ID }

// Add type declarations for the methods we're using
declare module "appwrite" {
  interface Account {
    createEmailSession(email: string, password: string): Promise<any>
    deleteSession(sessionId: string): Promise<any>
    updatePassword(password: string, oldPassword?: string): Promise<any>
    deleteSessions(): Promise<any>
    deleteAccount(): Promise<any>
    updateName(name: string): Promise<any>
    updateEmail(email: string, password: string): Promise<any>
    updatePrefs(prefs: any): Promise<any>
    get(): Promise<any>
    deleteIdentity(): Promise<any>
    delete(): Promise<any>
    createOAuth2Session(provider: string, success?: string, failure?: string, scopes?: string[]): void;
  }
  interface Databases {
    createDocument(databaseId: string, collectionId: string, documentId: string, data: any): Promise<any>
  }
  interface Functions {
    createExecution(functionId: string, data?: string, xasync?: boolean): Promise<any>
  }
}
