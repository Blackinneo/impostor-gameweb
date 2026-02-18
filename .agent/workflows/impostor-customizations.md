---
description: Customización y flujo de trabajo del proyecto Impostor GameWeb
---

# Impostor GameWeb — Workflow de Customización

## Flujo de Trabajo Git (Auto-Push)

Cada `git commit` hace push automático a GitHub gracias al hook `post-commit`.

### Setup inicial (una sola vez por clon)

```powershell
# Instalar hooks de git
.\scripts\install-hooks.ps1
```

### Flujo diario

```bash
# 1. Hacer cambios en el código
# 2. Stagear archivos
git add .

# 3. Commitear — el push ocurre automáticamente
git commit -m "descripción del cambio"

# El hook post-commit ejecuta: git push origin <branch>
```

### Desactivar auto-push temporalmente

```bash
# Commitear sin trigger del hook
git commit --no-verify -m "commit sin push"
```

---

## Crear Repositorio GitHub (primera vez)

```powershell
# Autenticar GitHub CLI
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")
gh auth login --hostname github.com --git-protocol https --web

# Crear repo y hacer primer push
gh repo create impostor-gameweb --public --description "Impostor social deduction game — Expo + TypeScript + Supabase" --source=. --remote=origin --push
```

---

## Configurar Variables de Entorno

```bash
# Copiar template
cp .env.example .env

# Editar con credenciales de Supabase
# EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
# EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

---

## Instalar Dependencias

```bash
npm install
```

---

## Correr el Proyecto

```bash
npm start          # Expo dev server
npm run android    # Android
npm run ios        # iOS (macOS only)
npm run web        # Browser
```
