# ─────────────────────────────────────────────────────────────────────────────
# setup-github.ps1
# Script de configuración completa de GitHub para Impostor GameWeb.
# 
# INSTRUCCIONES:
# 1. Creá un Personal Access Token en: https://github.com/settings/tokens/new
#    - Note: impostor-gameweb-cli
#    - Expiration: 90 days
#    - Scopes: ✅ repo (todo el grupo)
# 2. Reemplazá TU_TOKEN_AQUI con tu token (ghp_...)
# 3. Ejecutá este script en PowerShell:
#    .\scripts\setup-github.ps1
# ─────────────────────────────────────────────────────────────────────────────

param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$ErrorActionPreference = "Stop"

# Refrescar PATH para incluir gh
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")

Write-Host ""
Write-Host "🔐 Autenticando GitHub CLI..." -ForegroundColor Cyan

# Autenticar con el token
$Token | gh auth login --with-token --hostname github.com

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error de autenticación. Verificá que el token sea válido." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Autenticado correctamente." -ForegroundColor Green

# Verificar usuario
$user = gh api user --jq '.login'
Write-Host "👤 Usuario: $user" -ForegroundColor Cyan

Write-Host ""
Write-Host "📦 Creando repositorio en GitHub..." -ForegroundColor Cyan

# Crear repo y hacer primer push
gh repo create impostor-gameweb `
    --public `
    --description "Impostor social deduction game — Expo + TypeScript + Supabase" `
    --source=. `
    --remote=origin `
    --push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al crear el repositorio." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Repositorio creado y código subido." -ForegroundColor Green

# Instalar hooks
Write-Host ""
Write-Host "🔧 Instalando git hooks (auto-push)..." -ForegroundColor Cyan
Copy-Item -Path "scripts\hooks\post-commit" -Destination ".git\hooks\post-commit" -Force
Write-Host "✅ Hook post-commit instalado." -ForegroundColor Green

# Mostrar URL del repo
$repoUrl = gh repo view --json url --jq '.url'
Write-Host ""
Write-Host "🎉 ¡Todo listo!" -ForegroundColor Green
Write-Host "   Repositorio: $repoUrl" -ForegroundColor Cyan
Write-Host "   Cada 'git commit' hará push automático." -ForegroundColor Gray
Write-Host ""
