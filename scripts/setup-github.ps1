param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$ErrorActionPreference = "Stop"

# Refresh PATH to include gh
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")

# Use token via environment variable (bypasses scope validation)
$env:GITHUB_TOKEN = $Token
$env:GH_TOKEN = $Token

Write-Host ""
Write-Host "Verificando token de GitHub..." -ForegroundColor Cyan

$user = gh api user --jq ".login"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Token invalido. Verifica que el token tenga el scope 'repo'." -ForegroundColor Red
    exit 1
}

Write-Host "Autenticado como: $user" -ForegroundColor Green

Write-Host ""
Write-Host "Creando repositorio en GitHub..." -ForegroundColor Cyan

gh repo create impostor-gameweb `
    --public `
    --description "Impostor social deduction game - Expo + TypeScript + Supabase" `
    --source=. `
    --remote=origin `
    --push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al crear el repositorio. Puede que ya exista con ese nombre." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Repositorio creado y codigo subido." -ForegroundColor Green

Write-Host ""
Write-Host "Instalando git hook de auto-push..." -ForegroundColor Cyan
Copy-Item -Path "scripts\hooks\post-commit" -Destination ".git\hooks\post-commit" -Force
Write-Host "Hook instalado correctamente." -ForegroundColor Green

$repoUrl = gh repo view --json url --jq ".url"
Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "Todo listo!" -ForegroundColor Green
Write-Host "Repositorio: $repoUrl" -ForegroundColor Cyan
Write-Host "Cada git commit hara push automatico." -ForegroundColor Gray
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
