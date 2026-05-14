#!/usr/bin/env node

import { intro, outro, select, text, spinner, confirm } from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, "..");

function copyDir(src, dest, options = {}) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }
  fs.ensureDirSync(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, options);
    } else {
      if (options.filter && !options.filter(srcPath)) continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function mergeDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }
  fs.ensureDirSync(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      mergeDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function listFiles(dir, prefix = "") {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath, prefix + entry.name + "/"));
    } else {
      files.push(prefix + entry.name);
    }
  }
  return files;
}

async function main() {
  console.log(chalk.bold.cyan("\n🤖 create-agentic-app\n"));

  const projectDir = process.argv[2] || ".";
  const dryRun = process.argv.includes("--dry-run");

  const targetDir = path.resolve(process.cwd(), projectDir);
  const projectName = projectDir === "." ? path.basename(targetDir) : projectDir;

  if (dryRun) {
    console.log(chalk.yellow("🔍 Dry run mode - no files will be created\n"));
  }

  const framework = await select({
    message: "Select a framework:",
    options: [
      {
        value: "nextjs",
        label: "Next.js",
        hint: "Full-stack, App Router, Vercel-optimised",
      },
      {
        value: "astro",
        label: "Astro",
        hint: "Content-first, islands architecture, SSR/SSG",
      },
    ],
  });

  if (!framework) {
    console.log(chalk.yellow("Cancelled."));
    process.exit(0);
  }

  let packageManager;
  if (dryRun) {
    packageManager = "pnpm";
    console.log(chalk.gray(`  Using default package manager: pnpm (dry run)\n`));
  } else {
    packageManager = await select({
      message: "Which package manager?",
      options: [
        { value: "pnpm", label: "pnpm (recommended)" },
        { value: "npm", label: "npm" },
        { value: "yarn", label: "yarn" },
      ],
    });

    if (!packageManager) {
      console.log(chalk.yellow("Cancelled."));
      process.exit(0);
    }
  }

  const frameworkSrc = path.join(REPO_ROOT, "frameworks", framework, "templates");
  const coreSrc = path.join(REPO_ROOT, "core");

  if (dryRun) {
    console.log(chalk.bold(`\n📁 Files that would be created for ${framework === "nextjs" ? "Next.js" : "Astro"}:\n`));

    const templateFiles = listFiles(frameworkSrc);
    console.log(chalk.cyan("  Template files:"));
    templateFiles.slice(0, 20).forEach(f => console.log(chalk.gray(`    - ${f}`)));
    if (templateFiles.length > 20) {
      console.log(chalk.gray(`    ... and ${templateFiles.length - 20} more files`));
    }

    const coreFiles = listFiles(coreSrc);
    console.log(chalk.cyan("\n  Core layer files:"));
    coreFiles.slice(0, 10).forEach(f => console.log(chalk.gray(`    - .core/${f}`)));
    if (coreFiles.length > 10) {
      console.log(chalk.gray(`    ... and ${coreFiles.length - 10} more files`));
    }

    console.log(chalk.green("\n✅ Dry run complete - no files created.\n"));
    process.exit(0);
  }

  const s = spinner();
  s.start("Scaffolding your project...");

  try {
    fs.mkdirSync(targetDir, { recursive: true });

    s.text = "Copying framework template...";
    copyDir(frameworkSrc, targetDir, {
      filter: (src) => {
        const relativePath = path.relative(frameworkSrc, src);
        return !relativePath.includes("node_modules") &&
               !relativePath.includes(".next") &&
               !relativePath.includes(".git") &&
               !relativePath.includes("pnpm-lock.yaml") &&
               !relativePath.includes("package-lock.json") &&
               !relativePath.includes("yarn.lock");
      }
    });

    s.text = "Copying core layer...";
    const coreDest = path.join(targetDir, ".core");
    copyDir(coreSrc, coreDest);

    s.text = "Setting up Claude commands...";
    const claudeCommandsDest = path.join(targetDir, ".claude", "commands");
    mergeDir(path.join(coreSrc, "workflows"), claudeCommandsDest);

    s.text = "Setting up Cursor rules...";
    const cursorRulesDest = path.join(targetDir, ".cursor", "rules");
    mergeDir(path.join(coreSrc, "coding-rules"), cursorRulesDest);

    s.text = "Setting up MCP config...";
    fs.copyFileSync(
      path.join(coreSrc, "mcp", "mcp.json"),
      path.join(targetDir, ".mcp.json")
    );

    const envExample = path.join(targetDir, "env.example");
    if (fs.existsSync(envExample)) {
      fs.renameSync(envExample, path.join(targetDir, ".env"));
    }

    const gitignoreTemplatePath = path.join(targetDir, "_gitignore");
    const gitignorePath = path.join(targetDir, ".gitignore");
    if (fs.existsSync(gitignoreTemplatePath)) {
      fs.renameSync(gitignoreTemplatePath, gitignorePath);
    }

    if (projectDir !== ".") {
      const packageJsonPath = path.join(targetDir, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      }
    }

    s.stop("Project scaffolded ✅");

    const shouldInstall = await confirm({
      message: `Install dependencies with ${packageManager}?`,
    });

    if (shouldInstall) {
      const installSpinner = spinner();
      installSpinner.start(`Installing with ${packageManager}...`);
      try {
        const installCmd = packageManager === "yarn" ? "yarn install" : `${packageManager} install`;
        execSync(installCmd, { cwd: targetDir, stdio: "pipe" });
        installSpinner.stop("Dependencies installed ✅");
      } catch (error) {
        installSpinner.fail(chalk.red("Failed to install dependencies"));
        console.log(chalk.yellow(`\nPlease run "${packageManager} install" manually.\n`));
      }
    }

    console.log();
    console.log(chalk.bold.green(`✅ Your ${framework === "nextjs" ? "Next.js" : "Astro"} agentic app is ready!\n`));
    console.log(chalk.bold("Next steps:\n"));

    if (projectDir !== ".") {
      console.log(chalk.cyan(`  cd ${projectDir}`));
    }

    console.log(chalk.cyan("  1. Update the .env file with your API keys and database credentials"));
    console.log(chalk.cyan(`  2. Start the database: docker compose up -d`));
    console.log(chalk.cyan(`  3. Run database migrations: ${packageManager} run db:migrate`));
    console.log(chalk.cyan(`  4. Start the development server: ${packageManager} run dev`));

    console.log();
    console.log(chalk.gray("  🤖 AI agent commands are in .claude/commands/"));
    console.log(chalk.gray("  📐 Coding rules are in .cursor/rules/"));
    console.log(chalk.gray("  🧠 Core agent layer is in .core/"));

    console.log();

  } catch (error) {
    s.fail(chalk.red("Failed to create project"));
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);