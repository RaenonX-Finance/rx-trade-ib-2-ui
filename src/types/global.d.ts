import {OptionChainDataSource} from '@/types/data/option';


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production',

      // Public env vars
      NEXT_PUBLIC_MATH_API: string,

      // Public feature toggle
      NEXT_PUBLIC_OPTION_CHAIN_SOURCE?: OptionChainDataSource,
    }
  }
}
