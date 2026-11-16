# Practical Git Workflow Guide

**Project:** TeamProject  
**Audience:** B.Tech Computer Science Engineering Students & DevOps Practitioners  
**Environment:** Windows (PowerShell / Git Bash)

---

## 1. Introduction
This guide provides a complete, reproducible walkthrough of the Git version control lifecycle used in developing the **TeamProject** application across three developers.

---

## 2. Command Reference Summary

| Command | Purpose |
| :--- | :--- |
| `git init` | Initializes a new local Git repository in the current directory. |
| `git status` | Displays the working directory and staging area states. |
| `git add <files>` | Stages untracked or modified files for the next commit. |
| `git commit -m "<msg>"` | Records staged snapshots permanently to repository history. |
| `git branch <name>` | Creates a new branch pointer. |
| `git checkout -b <name>` | Creates and immediately switches to a new branch. |
| `git checkout <name>` | Switches HEAD to the specified branch. |
| `git merge <name>` | Integrates changes from target branch into the current branch. |
| `git merge --no-ff <name>` | Forces creation of a merge commit even if fast-forward is possible. |
| `git log --graph --oneline` | Displays visual ASCII topology of commits and branch points. |

---

## 3. Step-by-Step Execution Sequence

### Phase 1: Repository Initialisation & Base Setup
1. Create and enter the workspace directory:
   ```powershell
   cd C:\Users\DELL\Documents\TeamProject
   ```
2. Initialize repository and set default branch to `main`:
   ```bash
   git init
   git branch -m main
   ```
3. Set author identity for the lab session:
   ```bash
   git config user.name "Senior DevOps Engineer"
   git config user.email "devops@teamproject.local"
   ```
4. Create baseline files (`index.html`, `style.css`, `script.js`, `README.md`).
5. Stage and record initial snapshot:
   ```bash
   git add .
   git commit -m "Initial project setup"
   ```

---

### Phase 2: Feature Branch 1 – Developer 1 (`feature/task-ui`)
1. Create and switch to the UI feature branch:
   ```bash
   git checkout -b feature/task-ui
   ```
2. Implement user interface in `index.html` (input field, add button, task list container) and styles in `style.css`.
3. Verify status:
   ```bash
   git status
   ```
4. Stage and commit:
   ```bash
   git add index.html style.css
   git commit -m "Add task management user interface"
   ```

---

### Phase 3: Feature Branch 2 – Developer 2 (`feature/add-task`)
1. Create and switch to the task creation branch (branched off `feature/task-ui`):
   ```bash
   git checkout -b feature/add-task
   ```
2. Implement task creation logic in `script.js`:
   - Form submission listener.
   - Dynamic task item construction.
   - Array state and task counter badge.
3. Stage and commit:
   ```bash
   git add script.js
   git commit -m "Implement task creation functionality"
   ```

---

### Phase 4: Feature Branch 3 – Developer 3 (`feature/task-completion`)
1. Create and switch to the completion logic branch:
   ```bash
   git checkout -b feature/task-completion
   ```
2. Implement task completion and deletion in `script.js` & `style.css`:
   - Interactive checkbox event handlers.
   - Strike-through decoration and status pills (`Done` / `Pending`).
   - Task deletion trigger.
3. Stage and commit:
   ```bash
   git add script.js style.css
   git commit -m "Implement task completion functionality"
   ```

---

### Phase 5: Merging Feature Branches into `main`
1. Switch back to production branch:
   ```bash
   git checkout main
   ```
2. Merge Developer 1's UI work:
   ```bash
   git merge feature/task-ui
   ```
   *(Fast-forward merge applies smoothly)*

3. Merge Developer 2's task creation work with non-fast-forward:
   ```bash
   git merge feature/add-task --no-ff -m "Merge branch 'feature/add-task' into main"
   ```

---

### Phase 6: Simulating and Resolving Merge Conflict
1. While on `main`, update architecture section in `README.md`:
   ```bash
   git add README.md
   git commit -m "Update project documentation on main branch"
   ```
2. Switch to `feature/task-completion` and edit the same section in `README.md`:
   ```bash
   git checkout feature/task-completion
   git add README.md
   git commit -m "Update project documentation on feature/task-completion branch"
   ```
3. Switch back to `main` and trigger merge:
   ```bash
   git checkout main
   git merge feature/task-completion
   ```
4. Observe conflict output:
   ```
   Auto-merging README.md
   CONFLICT (content): Merge conflict in README.md
   Automatic merge failed; fix conflicts and then commit the result.
   ```
5. Inspect `git status` and resolve `README.md` by combining architecture notes from both branches.
6. Stage resolved file and complete the merge:
   ```bash
   git add README.md
   git commit -m "Merge branch 'feature/task-completion' into main and resolve merge conflict in README.md"
   ```

---

### Phase 7: Verification and Audit Trail
Inspect all branches and the full graph topology:
```bash
git log --oneline --graph --all
git branch -v
git status
```
Working tree will be completely clean and all branch pointers will be preserved.
