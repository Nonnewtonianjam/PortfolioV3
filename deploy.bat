@echo off
echo Deploying to both repositories...
git push origin main
git push vercel main
echo Deployment complete!
pause