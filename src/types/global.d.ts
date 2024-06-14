declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production',

      // Public env vars
      NEXT_PUBLIC_MATH_API: string,
    }
  }
}
