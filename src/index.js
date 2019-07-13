import { Linking, Platform } from 'react-native';
import { list } from './list';
import CheckPackageInstallation from '../android';

class AppInstalledScan {

    static getAppList() {
      return Object.keys(APP_LIST);
    }

    static verifyPackageName(package) {
      return new Promise((resolve, reject) => {
        CheckPackageInstallation.isPackageInstalled(package, (isInstalled) => {
          resolve(isInstalled);
        });
      });
    }

    static verifyUrlScheme(proto, query) {
      return new Promise((resolve, reject) => {
        Linking
          .canOpenURL(`${proto}://${query}` || '')
          .then((isInstalled) => {
            console.log('isInstalled', isInstalled);
            resolve(isInstalled);
          })
          .catch((err) => {
            console.log('error', err);
            reject(err);
          });
      });
    }

    /**
     * 
     */
    static appInstalled(key) {
      return Platform.select({
        ios: () => { 
          return this.appInstalledIOS(key); 
        },
        android: () => { 
          return this.appInstalledAndroid(key); 
        }
      })();
    }

    static appInstalledAndroid(value) {
        return this.verifyPackageName(list[value] != null ? list[value].packageName : value);
    }

    static appInstalledIOS(value) {
        return this.verifyUrlScheme(list[value].urlScheme, list[value].urlParams);
    }
}

export default AppInstalledScan;
