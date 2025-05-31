import 'react';

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      suppressHydrationWarning?: boolean;
    }
  }
} 