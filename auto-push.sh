#!/bin/bash

# Auto-push script for Meta Bet project
# This script automatically commits and pushes changes to GitHub

echo "🚀 Auto-pushing changes to GitHub..."

# Add all changes
git add .

# Check if there are any changes to commit
if git diff-index --quiet HEAD --; then
    echo "✅ No changes to commit"
else
    # Create commit with timestamp
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    commit_message="Auto-commit: $timestamp - $(git diff --name-only --cached | head -3 | tr '\n' ' ')"
    
    echo "📝 Committing changes: $commit_message"
    git commit -m "$commit_message"
    
    # Push to GitHub
    echo "🚀 Pushing to GitHub..."
    git push origin master
    
    echo "✅ Successfully pushed to GitHub!"
fi 