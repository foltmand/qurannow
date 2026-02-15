@echo off
echo ========================================
echo Quran Now - Android Build Script
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo ✓ Node.js is installed
echo.

echo [2/5] Checking Java installation...
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java is not installed!
    echo Please install JDK 11 or higher from https://adoptium.net/
    pause
    exit /b 1
)
java -version
echo ✓ Java is installed
echo.

echo [3/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [4/5] Cleaning previous builds...
cd android
call .\gradlew.bat clean
cd ..
echo ✓ Clean successful
echo.

echo [5/5] Building APK...
echo This may take several minutes...
cd android
call .\gradlew.bat assembleDebug
cd ..

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Your APK is ready at:
    echo android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo You can install this APK on your Android device!
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ BUILD FAILED!
    echo ========================================
    echo.
    echo Please check the error messages above.
    echo Common issues:
    echo 1. ANDROID_HOME not set
    echo 2. Android SDK not installed
    echo 3. Gradle issues
    echo.
    echo See BUILD_INSTRUCTIONS.md for detailed help.
    echo.
)

pause
