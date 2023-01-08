import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  appId: 'io.ionic.starter',
  appName: 'PresidentialBet',
  webDir: 'build',
  bundledWebRuntime: false,
  
};

export default config;
