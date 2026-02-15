#!/bin/bash

echo "========================================"
echo "Quran Now - Android Build Script"
echo "========================================"
echo ""

echo "[1/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
node --version
echo "✓ Node.js is installed"
echo ""

echo "[2/5] Checking Java installation..."
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed!"
    echo "Please install JDK 11 or higher from https://adoptium.net/"
    exit 1
fi
java -version
echo "✓ Java is installed"
echo ""

echo "[3/5] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

echo "[4/5] Cleaning previous builds..."
cd android
./gradlew clean
cd ..
echo "✓ Clean successful"
echo ""

echo "[5/5] Building APK..."
echo "This may take several minutes..."
cd android
chmod +x gradlew
./gradlew assembleDebug
cd ..

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "✓ BUILD SUCCESSFUL!"
    echo "========================================"
    echo ""
    echo "Your APK is ready at:"
    echo "android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "You can install this APK on your Android device!"
    echo ""
else
    echo ""
    echo "========================================"
    echo "✗ BUILD FAILED!"
    echo "========================================"
    echo ""
    echo "Please check the error messages above."
    echo "Common issues:"
    echo "1. ANDROID_HOME not set"
    echo "2. Android SDK not installed"
    echo "3. Gradle issues"
    echo ""
    echo "See BUILD_INSTRUCTIONS.md for detailed help."
    echo ""
fi
