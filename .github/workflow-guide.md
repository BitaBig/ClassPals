# Git Workflow Guide for ClassPals

## Branch Strategy

### Main Branches

- **`master`** (or `main`) - Production-ready code
- **`develop`** (optional) - Integration branch for features

### Feature Branches

Create a new branch for each feature/task:

- `feature/course-creation` - Adding course creation
- `feature/post-routes` - Implementing post routes
- `feature/user-profile` - User profile page
- `bugfix/login-error` - Fixing login issues

## Workflow Steps

### 1. Starting a New Feature

```bash
# Make sure you're on master and it's up to date
git checkout master
git pull origin master

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Example:
git checkout -b feature/post-routes
```

### 2. Working on Your Feature

```bash
# Make your changes, commit frequently
git add .
git commit -m "feat: add post creation route"

# Push your branch to GitHub
git push origin feature/your-feature-name
```

### 3. When Feature is Complete

```bash
# Make sure master is up to date
git checkout master
git pull origin master

# Merge your feature branch
git checkout feature/your-feature-name
git merge master  # Get latest changes
git push origin feature/your-feature-name

# Create Pull Request on GitHub, then merge via PR
# OR merge locally:
git checkout master
git merge feature/your-feature-name
git push origin master

# Delete the feature branch (after merged)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### 4. If Your Friend Pushed Changes

```bash
# Always pull latest before starting new work
git checkout master
git pull origin master

# If you're on a feature branch and master updated:
git checkout feature/your-feature-name
git merge master  # or git rebase master
```

## Best Practices

1. **Always start from master** - `git checkout master && git pull`
2. **One feature per branch** - Keep branches focused
3. **Commit often** - Small, logical commits
4. **Push frequently** - So your friend can see your progress
5. **Use descriptive branch names** - `feature/`, `bugfix/`, `refactor/`
6. **Create Pull Requests** - Review each other's code before merging
7. **Communicate** - Let your friend know what branch you're working on

## Example Workflow

```bash
# You want to add post routes
git checkout master
git pull origin master
git checkout -b feature/post-routes

# Work on post routes...
git add backend/src/routes/posts.ts
git commit -m "feat: implement GET /api/posts route"
git push origin feature/post-routes

# Continue working...
git add backend/src/routes/posts.ts
git commit -m "feat: implement POST /api/posts route"
git push origin feature/post-routes

# When done, create PR on GitHub or merge:
git checkout master
git merge feature/post-routes
git push origin master
```

## Handling Conflicts

If you both edited the same file:

```bash
git checkout master
git pull origin master
git checkout feature/your-branch
git merge master

# Fix conflicts in files, then:
git add .
git commit -m "fix: resolve merge conflicts"
git push origin feature/your-branch
```
