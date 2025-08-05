# Auto-Push to GitHub Setup

This project includes several ways to automatically push changes to GitHub after every modification.

## Option 1: Manual Auto-Push Scripts

### For Linux/Mac (Bash):
```bash
./auto-push.sh
```

### For Windows (Batch):
```cmd
auto-push.bat
```

## Option 2: Git Post-Commit Hook (Automatic)

The post-commit hook will automatically push to GitHub after every commit.

### To enable the hook on Windows:
1. Open Git Bash in the project directory
2. Run: `git update-index --chmod=+x .git/hooks/post-commit`

### To enable the hook on Linux/Mac:
```bash
chmod +x .git/hooks/post-commit
```

## Option 3: Manual Git Commands

If you prefer to do it manually:

```bash
# Add all changes
git add .

# Commit with a message
git commit -m "Your commit message"

# Push to GitHub
git push origin master
```

## How It Works

1. **auto-push.sh** (Linux/Mac): Bash script that adds all changes, commits with timestamp, and pushes
2. **auto-push.bat** (Windows): Batch file version of the same functionality
3. **post-commit hook**: Automatically runs after every `git commit` command

## Notes

- The scripts will only commit if there are actual changes
- Commit messages include timestamps and changed file names
- If push fails, you may need to pull first or check your connection
- The post-commit hook will run automatically after every commit

## Troubleshooting

If you get permission errors on Windows:
1. Right-click the script file
2. Select "Run as administrator"

If the post-commit hook doesn't work:
1. Make sure it's executable: `git update-index --chmod=+x .git/hooks/post-commit`
2. Check that your Git credentials are saved
3. Try running the manual script instead 