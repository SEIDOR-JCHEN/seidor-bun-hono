@echo off
REM Get the current path
set "current_path=%cd%"

REM Create the directories if they do not already exist
if not exist "%current_path%\bin\test\logs\errors" (
    echo Creating the errors folder for the test logs
    mkdir "%current_path%\bin\test\logs\errors"

if not exist "%current_path%\bin\test\logs\outputs" (
    echo Creating the outputs folder for the test logs
    mkdir "%current_path%\bin\test\logs\outputs"
))

if not exist "%current_path%\bin\production\logs\outputs" (
    echo Creating the outputs folder for the production logs
    mkdir "%current_path%\bin\production\logs\outputs"
)

if not exist "%current_path%\bin\production\logs\errors" (
    echo Creating the errors folder for the production logs
    mkdir "%current_path%\bin\production\logs\errors"
)

echo Logs folders are set up successfully
