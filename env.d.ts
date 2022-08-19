declare namespace NodeJS {
    export interface ProcessEnv extends ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      SPOTIFY_SCOPE: string
      SPOTIFY_REDIRECT_URI: string
      SPOTIFY_STATE_SECRET: string
      NEXT_PUBLIC_API_MOCKING: 'true' | 'false';
    }
  }
