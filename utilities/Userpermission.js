import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
class Userpermissions {
    getPermissionAsync = async () => {
        if (Constants.platform.android) {
            // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
}

export default new Userpermissions();