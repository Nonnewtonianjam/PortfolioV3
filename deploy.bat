@echo off
echo ========================================
echo   Portfolio Deployment Script
echo ========================================
echo.

REM Check if there are any changes to commit
git status --porcelain > temp_status.txt
set /p changes=<temp_status.txt
del temp_status.txt

if "%changes%"=="" (
    echo No changes detected. Pushing existing commits...
) else (
    echo Changes detected. Committing first...
    set /p commit_msg="Enter commit message (or press Enter for default): "
    if "%commit_msg%"=="" set commit_msg=Update portfolio
    
    git add .
    git commit -m "%commit_msg%"
    echo.
    echo ✓ Changes committed successfully
    echo.
)

echo Pushing to original repository (origin)...
git push origin master
if %errorlevel% neq 0 (
    echo ❌ Failed to push to origin
    pause
    exit /b 1
)
echo ✓ Successfully pushed to origin

echo.
echo Pushing to Vercel repository (vercel)...
git push vercel master
if %errorlevel% neq 0 (
    echo ❌ Failed to push to vercel
    pause
    exit /b 1
)
echo ✓ Successfully pushed to vercel

echo.
echo ========================================
echo   🚀 Deployment Complete!
echo   Your site will update shortly on Vercel
echo ========================================
echo.
pause