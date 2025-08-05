@echo off
REM Auto-push script for Meta Bet project (Windows version)
REM This script automatically commits and pushes changes to GitHub

echo 🚀 Auto-pushing changes to GitHub...

REM Add all changes
git add .

REM Check if there are any changes to commit
git diff-index --quiet HEAD --
if %errorlevel% equ 0 (
    echo ✅ No changes to commit
    goto :end
)

REM Create commit with timestamp
for /f "tokens=1-6 delims=/:. " %%a in ("%date% %time%") do set timestamp=%%c-%%b-%%a %%d:%%e:%%f
set timestamp=%timestamp: =0%

REM Get list of changed files for commit message
for /f "delims=" %%i in ('git diff --name-only --cached') do set changed_files=%%i

echo 📝 Committing changes: Auto-commit %timestamp% - %changed_files%
git commit -m "Auto-commit: %timestamp% - %changed_files%"

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push origin master

echo ✅ Successfully pushed to GitHub!

:end
pause 