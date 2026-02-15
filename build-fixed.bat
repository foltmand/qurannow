@echo off
echo Building Quran Now APK...
cd android
call .\gradlew.bat clean
call .\gradlew.bat assembleDebug
echo.
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo SUCCESS! APK is ready.
) else (
    echo BUILD FAILED!
)
pause