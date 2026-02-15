@echo off
set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_HOME=%DIRNAME%

set DEFAULT_JVM_OPTS=

if exist "%APP_HOME%\gradle\wrapper\gradle-wrapper.jar" (
    "%JAVA_HOME%\bin\java" -jar "%APP_HOME%\gradle\wrapper\gradle-wrapper.jar" %*
) else (
    echo Error: gradle-wrapper.jar not found
    exit /b 1
)