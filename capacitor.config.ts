import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#15233d",
      androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      showSpinner: true,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      spinnerColor: "#2afc75",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
  appId: 'com.thisrupt.PresidentialGame',
  appName: 'PresidentialGame',
  webDir: 'build',
  bundledWebRuntime: false,
};

export default config;
