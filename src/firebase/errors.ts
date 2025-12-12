// src/firebase/errors.ts

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public context: SecurityRuleContext;
  public readonly isContextualError = true;

  constructor(context: SecurityRuleContext) {
    const deniedMessage = `FirestorePermissionError: Access denied for ${context.operation} on ${context.path}`;
    super(deniedMessage);
    this.name = 'FirestorePermissionError';
    this.context = context;

    // This is for V8 compatibility
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
