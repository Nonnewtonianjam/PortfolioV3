#!/usr/bin/env pwsh

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Portfolio Deployment Script" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if there are any changes to commit
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "No changes detected. Pushing existing commits..." -ForegroundColor Yellow
} else {
    Write-Host "Changes detected. Committing first..." -ForegroundColor Yellow
    $commitMsg = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Update portfolio"
    }
    
    git add .
    git commit -m $commitMsg
    Write-Host ""
    Write-Host "✓ Changes committed successfully" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Pushing to original repository (origin)..." -ForegroundColor Blue
git push origin master
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push to origin" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Successfully pushed to origin" -ForegroundColor Green

Write-Host ""
Write-Host "Pushing to Vercel repository (vercel)..." -ForegroundColor Blue
git push vercel master
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push to vercel" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Successfully pushed to vercel" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   🚀 Deployment Complete!" -ForegroundColor Green
Write-Host "   Your site will update shortly on Vercel" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"