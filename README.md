# 🕌 Quran Now

A beautiful, modern Quran reading app for Android built with React Native.

![Quran Now](https://img.shields.io/badge/Version-1.0.0-green)
![Platform](https://img.shields.io/badge/Platform-Android-brightgreen)
![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)

## ✨ Features

- 📖 **Complete Quran** - All 114 Surahs with Arabic text
- 🌍 **English Translation** - Easy-to-read translations
- 🔖 **Bookmarks** - Save your favorite verses
- 🔍 **Search** - Find Surahs quickly
- 🎨 **Beautiful UI** - Dark mode with elegant design
- 📱 **Offline Ready** - Works without internet (after first load)
- 🔤 **Adjustable Text** - Customize Arabic font size
- 🎵 **Audio Ready** - Framework for audio recitations
- 💾 **Local Storage** - Saves bookmarks and settings

## 📸 Screenshots

Coming soon...

## 🚀 Quick Start

### For Users
1. Download the APK from releases
2. Install on your Android device
3. Start reading the Quran!

### For Developers

#### Prerequisites
- Node.js 18+
- JDK 11+
- Android Studio with SDK
- React Native CLI

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quran-now.git
cd QuranNow

# Install dependencies
npm install

# For Android
npm run android
```

#### Build APK

**Windows:**
```bash
build-apk.bat
```

**macOS/Linux:**
```bash
./build-apk.sh
```

Or manually:
```bash
cd android
./gradlew assembleDebug
```

📦 Your APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

For detailed instructions, see [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)

## 🏗️ Project Structure

```
QuranNow/
├── src/
│   ├── screens/           # App screens
│   │   ├── SurahListScreen.js
│   │   ├── ReadingScreen.js
│   │   ├── SettingsScreen.js
│   │   └── BookmarksScreen.js
│   ├── services/          # API services
│   │   └── QuranService.js
│   └── components/        # Reusable components
├── android/               # Android native code
├── App.js                # Root component
└── package.json          # Dependencies
```

## 🌐 API

This app uses the [Al-Quran Cloud API](https://alquran.cloud/api) - a free, open API for Quranic content.

**Base URL:** `https://api.alquran.cloud/v1`

**Key Endpoints:**
- `GET /surah/{number}` - Get Surah with verses
- `GET /ayah/{reference}` - Get specific verse
- `GET /search/{keyword}` - Search Quran

## 🎨 Customization

### Change Colors
Edit the color constants in each screen file:
- `#0a0e12` - Background
- `#10b981` - Emerald accent
- `#d4af37` - Gold accent

### Change App Name
Edit: `android/app/src/main/res/values/strings.xml`

### Change App Icon
Replace images in: `android/app/src/main/res/mipmap-*/`

## 📱 Screens

1. **Surah List** - Browse all 114 Surahs
2. **Reading View** - Read verses with translations
3. **Bookmarks** - Access saved verses
4. **Settings** - Customize reading experience

## 🛠️ Technologies

- **React Native** - Mobile framework
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data storage
- **Vector Icons** - Beautiful icons
- **Al-Quran Cloud API** - Quranic content

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Device model
- Android version
- Steps to reproduce
- Screenshots (if applicable)

## 💡 Feature Requests

Have an idea? Open an issue and describe:
- The feature you'd like
- Why it would be useful
- Any examples from other apps

## 🙏 Acknowledgments

- Al-Quran Cloud for the amazing API
- The Muslim community for inspiration
- All contributors and testers

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for the Muslim Ummah**

*"Indeed, this Quran guides to that which is most suitable" - Quran 17:9*
