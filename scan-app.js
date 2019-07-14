import { Linking, Platform } from 'react-native';
import { LIST } from './list';
import CheckPackageInstallation from './android';

class AppInstalledScan {

    /**
     * return list content keys
     */
    static getList() {
      return Object.keys(LIST);
    }

    /**
     * Return complete list
     */
    static getAllList() {
      return LIST;
    }

    static verifyPackageName(value) {
      return new Promise((resolve, reject) => {
        CheckPackageInstallation.isPackageInstalled(value, (isInstalled) => {
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

    static appInstalled(value) {
      return Platform.select({
        ios: () => { 
          return this.appInstalledIOS(value); 
        },
        android: () => { 
          return this.appInstalledAndroid(value); 
        }
      })();
    }

    static appInstalledAndroid(value) {
        return this.verifyPackageName(LIST[value] != null ? LIST[value].packageName : value);
    }

    static appInstalledIOS(value) {
        return this.verifyUrlScheme(LIST[value].urlScheme, LIST[value].urlParams);
    }
}

export default AppInstalledScan;
