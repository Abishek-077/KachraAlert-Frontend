import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const checks = [];

function addCheck(name, fn) {
  checks.push({ name, fn });
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8');
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

const criticalFiles = [
  'app/layout.tsx',
  'app/globals.css',
  'app/providers.tsx',
  'app/(public)/page.tsx',
  'app/(auth)/login/page.tsx',
  'app/(dashboard)/dashboard/page.tsx',
  'app/(dashboard)/layout.tsx',
  'app/(dashboard)/admin/page.tsx',
  'app/lib/api.ts',
  'app/lib/auth-context.tsx',
];

criticalFiles.forEach((file) => {
  addCheck(`File exists: ${file}`, () => {
    if (!exists(file)) throw new Error('Missing file');
  });

  addCheck(`File is not empty: ${file}`, () => {
    if (!exists(file)) throw new Error('Missing file');
    const size = fs.statSync(path.join(root, file)).size;
    if (size === 0) throw new Error('Empty file');
  });
});

addCheck('Root layout exports metadata', () => {
  const src = read('app/layout.tsx');
  if (!src.includes('metadata')) throw new Error('metadata export not found');
});

addCheck('Root layout exports default function', () => {
  const src = read('app/layout.tsx');
  if (!src.includes('export default function')) throw new Error('default export not found');
});

addCheck('Providers uses ThemeProvider', () => {
  const src = read('app/providers.tsx');
  if (!src.includes('ThemeProvider')) throw new Error('ThemeProvider not found');
});

addCheck('Auth schema contains login schema', () => {
  const src = read('app/(auth)/schema.ts');
  if (!src.includes('loginSchema')) throw new Error('loginSchema not found');
});

addCheck('Auth schema contains register schema', () => {
  const src = read('app/(auth)/schema.ts');
  if (!src.includes('registerStep1Schema')) throw new Error('registerStep1Schema not found');
});

addCheck('Dashboard has shell component', () => {
  const src = read('app/(dashboard)/_components/DashboardShell.tsx');
  if (!src.includes('DashboardShell')) throw new Error('DashboardShell not found');
});

addCheck('Sidebar component includes nav links', () => {
  const src = read('app/(dashboard)/_components/Sidebar.tsx');
  if (!src.includes('href')) throw new Error('No href links found');
});

addCheck('Demo data exports chart data', () => {
  const src = read('lib/demo-data.ts');
  if (!src.includes('weeklyPickups')) throw new Error('weeklyPickups export not found');
});

addCheck('Types file defines User role type', () => {
  const src = read('lib/types.ts');
  if (!src.includes('WasteType')) throw new Error('role type missing');
});

addCheck('API utility exports apiGet', () => {
  const src = read('app/lib/api.ts');
  if (!src.includes('apiGet')) throw new Error('apiGet not found');
});

let failed = 0;
let passed = 0;

for (const check of checks) {
  try {
    check.fn();
    passed += 1;
    console.log(`✅ ${check.name}`);
  } catch (error) {
    failed += 1;
    console.error(`❌ ${check.name}`);
    console.error(`   ${error.message}`);
  }
}

console.log(`\nSummary: ${passed} passed, ${failed} failed, ${checks.length} total.`);

if (failed > 0) {
  process.exitCode = 1;
}
