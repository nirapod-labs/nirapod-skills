#!/usr/bin/env node
/**
 * @file install.js
 * @brief Auto-installs agent skills into the local repository.
 *
 * @remarks
 * Executed via `bunx github:nirapod-labs/nirapod-skills`.
 * Copies the entire `skills/` directory from the cloned repository directly
 * into the caller's `.agents/skills` repository directory.
 *
 * SPDX-License-Identifier: MIT
 * SPDX-FileCopyrightText: 2026 Nirapod Contributors
 */

const fs = require('node:fs');
const path = require('node:path');

const SOURCE_SKILLS = path.join(__dirname, 'skills');
const TARGET_DIR = path.join(process.cwd(), '.agents', 'skills');

console.log(`\x1b[36m▓▓ Initializing Nirapod Advanced Agentic Skills...\x1b[0m`);

if (!fs.existsSync(SOURCE_SKILLS)) {
  console.error(`\x1b[31m✗ Error: Could not locate source skills directory inside package.\x1b[0m`);
  process.exit(1);
}

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

try {
  fs.cpSync(SOURCE_SKILLS, TARGET_DIR, { recursive: true, force: true });
  console.log(`\x1b[32m✓ Successfully integrated ${fs.readdirSync(SOURCE_SKILLS).length} skill bundles into .agents/skills/\x1b[0m`);
} catch (error) {
  console.error(`\x1b[31m✗ Failed to inject skills:\x1b[0m`, error.message);
  process.exit(1);
}
