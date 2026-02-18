# ─────────────────────────────────────────────────────────────────────────────
# install-hooks.ps1
# Instala los git hooks del proyecto en .git/hooks/
# Ejecutar una vez después de clonar el repositorio.
#
# Uso:
#   .\scripts\install-hooks.ps1
# ─────────────────────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"

$hooksSource = Join-Path $PSScriptRoot "hooks"
$hooksTarget = Join-Path (git rev-parse --show-toplevel) ".git\hooks"

Write-Host ""
Write-Host "🔧 Instalando git hooks..." -ForegroundColor Cyan

if (-not (Test-Path $hooksSource)) {
    Write-Host "❌ No se encontró la carpeta scripts/hooks/" -ForegroundColor Red
    exit 1
}

Get-ChildItem -Path $hooksSource | ForEach-Object {
    $dest = Join-Path $hooksTarget $_.Name
    Copy-Item -Path $_.FullName -Destination $dest -Force

    # En Windows, git usa sh.exe del PATH (Git Bash) para ejecutar hooks
    # No necesitamos chmod, pero verificamos que el archivo se copió
    Write-Host "  ✅ $($_.Name) → .git/hooks/$($_.Name)" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Hooks instalados correctamente." -ForegroundColor Green
Write-Host "   Cada 'git commit' hará push automático a origin." -ForegroundColor Gray
Write-Host ""
