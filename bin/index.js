#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const prompts = require("prompts");

async function run() {
  try {
    const cwdName = path.basename(process.cwd());
    const defaultPath = "./";

    console.log("\n");

    // 交互
    const response = await prompts([
      {
        type: "text",
        name: "name",
        message: "Project name",
        initial: cwdName,
      },
      {
        type: "text",
        name: "description",
        message: "Description",
        initial: "",
      },
    ]);

    if (!response.name) {
      console.log(
        "\n" +
          chalk.yellow.bold("⚠️  Aborted.") +
          chalk.gray(" User cancelled the operation.\n")
      );
      process.exit(1);
    }

    // copy 文件
    const targetDir = path.resolve(process.cwd(), defaultPath);
    const templateDir = path.resolve(__dirname, "..", "template");
    await fs.copy(templateDir, targetDir);

    // 重命名 gitignore -> .gitignore
    const gitignorePath = path.join(targetDir, "gitignore");
    const dotGitignorePath = path.join(targetDir, ".gitignore");

    if (fs.existsSync(gitignorePath)) {
      await fs.rename(gitignorePath, dotGitignorePath);
    }

    async function replaceVars(dir) {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) {
        const items = await fs.readdir(dir);
        for (const it of items) {
          await replaceVars(path.join(dir, it));
        }
      } else {
        // 只处理文本文件：基于扩展名简单判断
        const textExt = [".js", ".ts", ".json", ".md", ".html", ".css", ".env", '.yml', '.mts'];
        const ext = path.extname(dir).toLowerCase();
        if (textExt.includes(ext)) {
          let content = await fs.readFile(dir, "utf8");
          content = content
            .replaceAll("{{name}}", response.name)
            .replaceAll("<<name>>", response.name)
            .replaceAll("{{description}}", response.description);
          await fs.writeFile(dir, content, "utf8");
        }
      }
    }
    await replaceVars(targetDir);
    await initGit(targetDir);

    // created
    // console.log("\n🎉 " + chalk.green("Project successfully created!") + "\n");
    // console.log(chalk.green("📁 Location: ") + chalk.whiteBright(targetDir));
    console.log("\n🚀 " + chalk.blueBright("Next steps:") + "");

    console.log(chalk.gray("  1.") + " " + chalk.white("pnpm install"));
    console.log(
      chalk.gray("  2.") +
        " " +
        chalk.white("npm run play ") +
        chalk.gray("# or read README for details")
    );
    console.log("\n✨ " + chalk.magenta("Enjoy coding!") + "\n");
  } catch (error) {
    console.log(
      "\n" +
        chalk.bgRed.white.bold(" ERROR ") +
        " " +
        chalk.red("Something went wrong:\n")
    );

    // 如果是 Error 对象，输出栈信息
    if (error instanceof Error) {
      console.log(chalk.red.bold("✖ Message: ") + chalk.white(error.message));
      if (error.stack) {
        console.log(
          "\n" + chalk.gray(error.stack.split("\n").slice(1).join("\n"))
        );
      }
    } else {
      // 其他类型的错误（如字符串或对象）
      console.log(
        chalk.red.bold("✖ Details: ") +
          chalk.white(JSON.stringify(error, null, 2))
      );
    }

    console.log(
      "\n" +
        chalk.yellow("💡 Hint: ") +
        chalk.white("Check your input or file paths.")
    );
    console.log(
      chalk.gray("If this keeps happening, please open an issue on GitHub.\n")
    );
    process.exit(1);
  }
}

async function initGit(targetDir) {
  console.log(chalk.blueBright("\n📦 Initializing Git repository..."));

  try {
    // 检查是否已存在 .git
    const gitDir = path.join(targetDir, ".git");
    if (fs.existsSync(gitDir)) {
      console.log(chalk.yellow("⚠️  Git already initialized, skipping."));
      return;
    }

    // 执行初始化
    execSync("git init", { cwd: targetDir, stdio: "ignore" });
    execSync("git checkout -b main", { cwd: targetDir, stdio: "ignore" });

    console.log(
      chalk.gray("  1.") +
        " " +
        chalk.white("Git repository initialized successfully.")
    );
  } catch (error) {
    console.log(chalk.yellow("⚠️  Failed to initialize Git repository."));
    console.log(chalk.gray("   You can do it manually later:"));
    console.log(
      chalk.gray(
        `   cd ${path.relative(
          process.cwd(),
          targetDir
        )} && git init && git add . && git commit -m "init project"\n`
      )
    );
  }
}

run();
