# Quran Now - Android App Build Guide

## 📱 Complete Guide to Build APK

### Prerequisites
Before you start, make sure you have these installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Check version: `node --version`

2. **Java Development Kit (JDK)** (version 11 or higher)
   - Download from: https://adoptium.net/
   - Check version: `java -version`

3. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API Level 33)
   - Install Android SDK Build-Tools

4. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

### Environment Setup

#### Windows
1. Set ANDROID_HOME environment variable:
   - Right-click "This PC" → Properties → Advanced System Settings
   - Click "Environment Variables"
   - Add new System Variable:
     - Variable name: `ANDROID_HOME`
     - Variable value: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
   
2. Add to PATH:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

3. Set JAVA_HOME:
   - Variable name: `JAVA_HOME`
   - Variable value: Path to your JDK (e.g., `C:\Program Files\Eclipse Adoptium\jdk-11.0.19.7-hotspot`)

#### macOS/Linux
Add to `~/.bash_profile` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
```

Then run: `source ~/.bash_profile` or `source ~/.zshrc`

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd QuranNow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install pods (macOS only, for iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Link vector icons**
   ```bash
   npx react-native-asset
   ```

### Building the APK

#### Method 1: Debug APK (for testing)
```bash
cd android
./gradlew assembleDebug
```
The APK will be located at:
`android/app/build/outputs/apk/debug/app-debug.apk`

#### Method 2: Release APK (for distribution)

1. **Generate a signing key** (first time only):
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias quran-now-key -keyalg RSA -keysize 2048 -validity 10000
   ```
   
   Remember your passwords!

2. **Configure signing** in `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file('release.keystore')
           storePassword 'YOUR_STORE_PASSWORD'
           keyAlias 'quran-now-key'
           keyPassword 'YOUR_KEY_PASSWORD'
       }
   }
   ```

3. **Build release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

The APK will be at:
`android/app/build/outputs/apk/release/app-release.apk`

#### Method 3: Using npm script
```bash
npm run build:android
```

### Testing on Device/Emulator

#### On Android Emulator
1. Open Android Studio → AVD Manager
2. Create/Start an emulator
3. Run:
   ```bash
   npm run android
   ```

#### On Physical Device
1. Enable USB Debugging on your Android device:
   - Settings → About Phone → Tap "Build Number" 7 times
   - Settings → Developer Options → Enable USB Debugging

2. Connect device via USB

3. Check device is connected:
   ```bash
   adb devices
   ```

4. Run:
   ```bash
   npm run android
   ```

### Common Issues & Solutions

#### Issue: "SDK location not found"
**Solution**: Create `android/local.properties`:
```
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```
(Use forward slashes / on macOS/Linux)

#### Issue: "Command not found: gradlew"
**Solution**: 
```bash
cd android
chmod +x gradlew
```

#### Issue: Port already in use
**Solution**:
```bash
npx react-native start --reset-cache
```

#### Issue: Build fails with "Could not resolve all files"
**Solution**:
```bash
cd android
./gradlew clean
./gradlew assembleDebug --refresh-dependencies
```

#### Issue: Metro bundler issues
**Solution**:
```bash
watchman watch-del-all
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

### App Bundle (for Google Play Store)

To create an Android App Bundle (AAB) for Play Store:
```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Optimizing APK Size

1. **Enable ProGuard** in `android/app/build.gradle`:
   ```gradle
   def enableProguardInReleaseBuilds = true
   ```

2. **Enable separate builds per architecture**:
   ```gradle
   def enableSeparateBuildPerCPUArchitecture = true
   ```

3. **Remove unused resources**:
   ```gradle
   android {
       buildTypes {
           release {
               shrinkResources true
               minifyEnabled true
           }
       }
   }
   ```

### Project Structure

```
QuranNow/
├── android/                 # Android native code
│   ├── app/
│   │   ├── build.gradle    # App-level gradle config
│   │   └── src/main/
│   │       └── AndroidManifest.xml
│   └── build.gradle        # Project-level gradle config
├── src/
│   ├── components/         # Reusable components
│   ├── screens/           # Screen components
│   │   ├── SurahListScreen.js
│   │   ├── ReadingScreen.js
│   │   ├── SettingsScreen.js
│   │   └── BookmarksScreen.js
│   ├── services/          # API services
│   │   └── QuranService.js
│   └── utils/             # Helper functions
├── App.js                 # Root component
├── package.json           # Dependencies
└── README.md             # This file

```

### Features

✅ Complete list of 114 Surahs
✅ Arabic text with translations
✅ Bookmarks functionality
✅ Adjustable font sizes
✅ Dark mode
✅ Search functionality
✅ Audio recitation support (API ready)
✅ Offline storage with AsyncStorage
✅ Beautiful UI with smooth animations

### API Integration

The app uses **Al-Quran Cloud API** (free, no authentication required):
- Base URL: `https://api.alquran.cloud/v1`
- Endpoints:
  - `/surah/{number}` - Get surah details
  - `/ayah/{reference}` - Get specific verse
  - `/search/{keyword}` - Search in Quran

### Customization

1. **Change app name**: Edit `android/app/src/main/res/values/strings.xml`
2. **Change app icon**: Replace images in `android/app/src/main/res/mipmap-*/`
3. **Change package name**: Use `react-native-rename` package
4. **Change colors**: Edit color constants in screen files

### Publishing to Google Play Store

1. Build release AAB: `./gradlew bundleRelease`
2. Create developer account: https://play.google.com/console
3. Create app listing
4. Upload AAB file
5. Complete store listing (screenshots, description, etc.)
6. Submit for review

### Support

For issues or questions:
- Check React Native docs: https://reactnative.dev/
- Android docs: https://developer.android.com/
- Al-Quran Cloud API: https://alquran.cloud/api

### License

This project is open source and available for educational purposes.

---

**Built with ❤️ for the Muslim community**
