import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as templates from './templates/index.js';

interface InitOptions {
  force: boolean;
}

export async function runInit(args: string[]) {
  const force = args.includes('--force');
  const options: InitOptions = { force };

  const cwd = process.cwd();
  const specs = new Map<string, string>();

  // Specs structure
  const specsDir = join(cwd, 'specs');
  const specSubdirs = ['flows', 'interfaces', 'artifacts', 'policies', 'behaviors', 'workspace'];
  const aiDslDir = join(cwd, 'ai', 'dsl');

  // Track what was created
  const created: string[] = [];
  const skipped: string[] = [];

  // Create specs directory and subdirectories
  for (const subdir of specSubdirs) {
    const dir = join(specsDir, subdir);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      created.push(`specs/${subdir}/`);
    } else if (!force) {
      skipped.push(`specs/${subdir}/ (already exists)`);
    }
  }

  // Create .gitkeep files in each subdir
  for (const subdir of specSubdirs) {
    const gitkeepPath = join(specsDir, subdir, '.gitkeep');
    if (!existsSync(gitkeepPath) || force) {
      writeFileSync(gitkeepPath, '');
    }
  }

  // Create ai/dsl directory
  if (!existsSync(aiDslDir)) {
    mkdirSync(aiDslDir, { recursive: true });
    created.push('ai/dsl/');
  }

  // Write AI_SYSTEM.md
  const aiSystemPath = join(cwd, 'AI_SYSTEM.md');
  if (!existsSync(aiSystemPath) || force) {
    writeFileSync(aiSystemPath, templates.aiSystemTemplate);
    created.push('AI_SYSTEM.md');
  } else {
    skipped.push('AI_SYSTEM.md (already exists)');
  }

  // Write architecto.config.yaml
  const configPath = join(cwd, 'architecto.config.yaml');
  if (!existsSync(configPath) || force) {
    writeFileSync(configPath, templates.configTemplate);
    created.push('architecto.config.yaml');
  } else {
    skipped.push('architecto.config.yaml (already exists)');
  }

  // Write DSL docs
  const dslDocs = [
    { name: 'principles.md', content: templates.principlesTemplate },
    { name: 'spec-types.md', content: templates.specTypesTemplate },
    { name: 'flow-spec.md', content: templates.flowSpecTemplate },
    { name: 'interface-spec.md', content: templates.interfaceSpecTemplate },
    { name: 'artifact-spec.md', content: templates.artifactSpecTemplate },
    { name: 'policy-spec.md', content: templates.policySpecTemplate },
    { name: 'behavior-spec.md', content: templates.behaviorSpecTemplate },
    { name: 'workspace-spec.md', content: templates.workspaceSpecTemplate },
    { name: 'generation-rules.md', content: templates.generationRulesTemplate },
    { name: 'anti-patterns.md', content: templates.antiPatternsTemplate },
  ];

  for (const doc of dslDocs) {
    const docPath = join(aiDslDir, doc.name);
    if (!existsSync(docPath) || force) {
      writeFileSync(docPath, doc.content);
      created.push(`ai/dsl/${doc.name}`);
    } else {
      skipped.push(`ai/dsl/${doc.name} (already exists)`);
    }
  }

  // Print results
  console.log('\nArchitecto v0.1 — Initialization\n');

  if (created.length > 0) {
    console.log('✓ Created:');
    for (const item of created) {
      console.log(`  ${item}`);
    }
  }

  if (skipped.length > 0) {
    console.log('\n⊘ Skipped (already exists):');
    for (const item of skipped) {
      console.log(`  ${item}`);
    }
    if (!force) {
      console.log('\nUse --force to overwrite existing files.');
    }
  }

  console.log('\n✓ Project initialized!\n');
  console.log('Next steps:');
  console.log('  1. Read ai/AI_SYSTEM.md to understand the protocol');
  console.log('  2. Check ai/dsl/ for detailed spec documentation');
  console.log('  3. Create your first spec in specs/flows/');
  console.log('  4. Run: architecto validate\n');
}
