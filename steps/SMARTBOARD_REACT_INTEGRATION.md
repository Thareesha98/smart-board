# Smart Board React Integration Guide

## Overview
This guide provides step-by-step instructions to integrate smartboard-react into the smart-board project.

---

## Phase 1: Preparation & Assessment

### Step 1: Identify smartboard-react Source
- [ ] Determine if smartboard-react is:
  - A separate npm package published on npm registry
  - A local directory/branch in your repository
  - A GitHub repository
  - A component library
  
**Action:** 
```bash
# If it's an npm package, search it:
npm search smartboard-react

# If it's a local directory, check if it exists:
ls -la ../smartboard-react
```

### Step 2: Backup Current Project
```bash
# Create a backup of the current front-end
cd smart-board
git branch -b backup/current-state
git commit -m "Backup before smartboard-react integration"
```

### Step 3: Review Project Structure
- [ ] Compare `smart-board/front-end` structure with smartboard-react structure
- [ ] Document differences in dependencies
- [ ] Identify conflicting packages
- [ ] Note custom configurations (Tailwind, Vite, ESLint)

---

## Phase 2: Dependency Management

### Step 4: Merge Dependencies
Navigate to `smart-board/front-end` and update `package.json`:

```bash
cd c:\Users\sandu\OneDrive\Desktop\smart-board\front-end
```

**Recommended approach:**
1. Copy `smartboard-react/package.json` dependencies
2. Compare with current `package.json`
3. Merge unique packages while keeping compatible versions

**Critical packages to check:**
- react & react-dom (should match)
- vite
- tailwindcss
- TypeScript (if used)
- Build tools

### Step 5: Install Merged Dependencies
```bash
npm install
```

**If there are conflicts:**
```bash
npm install --legacy-peer-deps
```

### Step 6: Verify No Duplicate Versions
```bash
npm ls
```

Look for red warnings about duplicate versions. Resolve using:
```bash
npm dedupe
```

---

## Phase 3: Project Structure Merge

### Step 7: Copy Component Structure
```bash
# From smartboard-react, copy:
# - src/components (merge with existing)
# - src/layouts (if exists)
# - src/hooks (if exists)
# - src/utils (if exists)
# - src/assets (merge carefully)
```

**Strategy:**
- Create a new branch: `git checkout -b feature/smartboard-react-merge`
- Copy directories one at a time
- Use naming conventions to avoid conflicts
- Example: If both have `Button.jsx`, rename smartboard version to `SmartButton.jsx`

### Step 8: Merge Configuration Files
Merge or compare these files:

```bash
# Vite config
cat vite.config.js

# Tailwind config
cat tailwind.config.js

# PostCSS config
cat postcss.config.js

# ESLint config
cat eslint.config.js

# Environment variables
cat .env
cat .env.development
cat .env.production
```

**Action:** Combine configurations, keeping project-specific settings from both.

### Step 9: Copy Page Components
```bash
# Copy from smartboard-react:
# cp -r smartboard-react/src/pages/* front-end/src/pages/
```

Organize pages by role:
```
src/pages/
├── student/
├── owner/
├── admin/
├── auth/
└── common/
```

### Step 10: Merge Route Definitions
Update `front-end/src/routes/`:

Compare and merge:
- `StudentAppRoutes.jsx`
- `OwnerAppRoutes.jsx`
- `AdminAppRoutes.jsx`

Include smartboard-react routes while preserving existing ones.

---

## Phase 4: Context & State Management

### Step 11: Merge Auth Contexts
Compare authentication contexts:

```bash
# Check existing contexts
ls front-end/src/context/*/

# Compare with smartboard-react
ls smartboard-react/src/context/*/
```

**Action:** 
- Merge `StudentAuthContext`
- Merge `OwnerAuthContext`
- Merge `AdminAuthContext`
- Keep best practices from both implementations

### Step 12: Merge Custom Hooks
Copy smartboard-react hooks to:
```bash
# front-end/src/hooks/
```

Organize by role:
```
src/hooks/
├── student/
├── owner/
├── admin/
└── common/
```

---

## Phase 5: API Integration

### Step 13: Merge API Services
Compare API files:

```bash
# Existing:
ls front-end/src/api/

# From smartboard-react:
ls smartboard-react/src/api/
```

**Action:**
- Merge axios configurations
- Combine service classes
- Ensure consistent base URL usage
- Check for environment variables

### Step 14: Update Environment Variables
```bash
# Update front-end/.env.development and .env.production
VITE_API_BASE=https://smartboard.thareesha.software/api
VITE_GOOGLE_MAPS_API_KEY=<your-key>
# Add any new variables from smartboard-react
```

---

## Phase 6: Styling & Assets

### Step 15: Merge CSS & Styling
```bash
# Copy global styles
cp smartboard-react/src/index.css front-end/src/

# Copy or merge tailwind configs
```

**Action:**
- Merge Tailwind configurations
- Ensure custom colors & themes are included
- Update CSS variables if needed

### Step 16: Copy Assets
```bash
# Merge image assets, fonts, etc.
# front-end/src/assets/
```

Be careful not to overwrite existing logos/branding.

---

## Phase 7: Testing & Validation

### Step 17: Clear Cache & Reinstall
```bash
cd front-end

# Remove cache
rm -r node_modules package-lock.json

# Reinstall everything
npm install

# Clear Vite cache
rm -r .vite node_modules/.vite
```

### Step 18: Run Development Server
```bash
npm run dev
```

**Check for errors:**
- Missing imports
- Broken routes
- Style issues
- API connection problems

### Step 19: Test All Routes
Navigate through each section:
- [ ] Student dashboard: `/student/dashboard`
- [ ] Owner dashboard: `/owner/dashboard`
- [ ] Admin dashboard: `/admin/dashboard`
- [ ] Login page: `/login`
- [ ] Signup page: `/signup`

### Step 20: Fix Import Errors
If you see import errors:

```bash
# Check for missing packages
npm ls | grep ERR

# Install missing packages
npm install <package-name>
```

---

## Phase 8: Build & Production

### Step 21: Build for Production
```bash
npm run build
```

Check for build errors:
```bash
# Successful build output
dist/
├── index.html
├── assets/
└── ...
```

### Step 22: Test Production Build
```bash
npm run preview
```

Visit: `http://localhost:4173/`

---

## Phase 9: Version Control & Deployment

### Step 23: Commit Changes
```bash
git add .
git commit -m "feat: integrate smartboard-react components and structure"
git push origin feature/smartboard-react-merge
```

### Step 24: Create Pull Request
- Review all changes
- Test on staging branch
- Get team approval
- Merge to main/develop

### Step 25: Deploy
```bash
# Tag release
git tag v1.0.0-smartboard-react

# Push to production
git push origin v1.0.0-smartboard-react

# Deploy via your CI/CD pipeline
# (GitHub Actions, Jenkins, etc.)
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue 1: Module Not Found
```bash
# Error: Cannot find module 'X'
npm install X
npm install --legacy-peer-deps  # If peer dependency conflicts
```

#### Issue 2: Port Already in Use
```bash
# Port 5173/5174 in use
npm run dev -- --port 3000
```

#### Issue 3: Build Failures
```bash
# Clear all caches
rm -r node_modules dist .vite
npm install
npm run build
```

#### Issue 4: Styling Issues
```bash
# Rebuild Tailwind CSS
# Make sure tailwind.config.js includes all template paths
npm run build
```

#### Issue 5: API Connection Issues
```bash
# Check .env files have correct API_BASE
cat .env.development
cat .env.production

# Verify backend is running
curl https://smartboard.thareesha.software/api
```

---

## Verification Checklist

After integration, verify:

- [ ] All dependencies installed without errors
- [ ] Dev server runs: `npm run dev`
- [ ] No console errors on page load
- [ ] All routes accessible
- [ ] Authentication working (login/signup)
- [ ] API calls successful
- [ ] Styling displays correctly
- [ ] Production build: `npm run build` succeeds
- [ ] No build warnings
- [ ] Responsive design working on mobile
- [ ] All components render properly

---

## Rollback Plan

If integration fails critically:

```bash
# Checkout previous branch
git checkout backup/current-state

# Or reset to last commit
git reset --hard HEAD~1

# Start over with different approach
```

---

## Next Steps

1. **Performance Optimization**
   - Run Lighthouse audit
   - Optimize images
   - Code splitting
   - Lazy loading

2. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Cypress/Playwright)

3. **Documentation**
   - Component documentation
   - API documentation
   - Deployment guide

4. **CI/CD Pipeline**
   - Set up automated tests
   - Automated deployments
   - Error monitoring

---

## Support

For issues during integration:
1. Check this guide again
2. Review Git history: `git log`
3. Compare files: `git diff`
4. Check terminal output for specific errors
5. Contact your development team

---

**Last Updated:** February 15, 2026  
**Status:** Integration Guide v1.0
