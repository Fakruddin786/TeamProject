# Branching Strategy & Workflow Specification

**Project:** TeamProject (Team Task Management Application)  
**Document Version:** 1.0.0  
**Context:** B.Tech Computer Science Engineering DevOps Laboratory  
**Model Adopted:** Feature Branch Workflow (Git Flow Variant for Agile Teams)

---

## 1. Overview and Objectives
In modern software engineering, multiple developers collaborate on a single codebase. Without a formal branching model, concurrent development leads to code overwrites, regression bugs, and uncoordinated releases.

This project implements the **Feature Branch Workflow**, isolating every new feature, bug fix, or UI enhancement into its own dedicated branch. No developer commits unreviewed or experimental code directly to the production branch (`main`).

---

## 2. Branch Hierarchy and Architecture

```
main (Production/Stable Code)
 │
 ├── feature/task-ui          (Developer 1: HTML & CSS User Interface)
 ├── feature/add-task         (Developer 2: JS Task Creation & State Storage)
 └── feature/task-completion  (Developer 3: Task Completion & Status Management)
```

### 2.1 The `main` Branch
- **Purpose:** Represents the production-ready, thoroughly tested, and stable state of the application.
- **Policies:**
  - Direct commits by individual developers are strictly prohibited in production environments.
  - Changes must arrive only via reviewed and verified pull requests or merges.
  - Every commit on `main` must produce a functioning, bug-free build.

### 2.2 Feature Branches
- **Lifetime:** Ephemeral (short-lived). Created from `main` when a task begins, and merged back into `main` once completed and verified.
- **Isolation:** Developers work entirely within their assigned branch without affecting other team members.

---

## 3. Branch Naming Conventions

All branch names must follow a standardized, predictable format:

| Category | Format | Example |
| :--- | :--- | :--- |
| **New Features** | `feature/<feature-name>` | `feature/task-ui`, `feature/add-task` |
| **Bug Fixes** | `bugfix/<issue-description>` | `bugfix/button-alignment` |
| **Hotfixes** | `hotfix/<critical-patch>` | `hotfix/security-xss-patch` |
| **Documentation** | `docs/<doc-topic>` | `docs/api-guide` |

**Rules:**
- All lowercase letters.
- Words separated by hyphens (`-`).
- No special characters, spaces, or underscores.

---

## 4. Team Allocation and Developer Responsibilities

| Role | Branch Assigned | Core Responsibilities | Target Deliverables |
| :--- | :--- | :--- | :--- |
| **Developer 1** (Frontend Lead) | `feature/task-ui` | Build user interface structure and visual styling. | Responsive layout, task input form, task container cards, and CSS styling in `index.html` & `style.css`. |
| **Developer 2** (Logic Lead) | `feature/add-task` | Implement client-side task creation and event listening. | Form submission handling, input validation, DOM rendering of new items, and counter updates in `script.js`. |
| **Developer 3** (Interactivity Lead)| `feature/task-completion` | Implement task lifecycle operations (completion, status toggle, deletion). | Checkbox change events, strike-through styling, status badges, and task removal handling in `script.js` & `style.css`. |

---

## 5. Commit Guidelines

Commits serve as the chronological audit trail of the project. Developers must adhere to clear commit standards:

### 5.1 Format: Conventional Imperative Style
- Format: `<Imperative Verb> <concise summary of changes>`
- Maximum 50 characters for the subject line.
- Capitalize the first letter; do not end with a period.

### 5.2 Good vs. Bad Commit Examples
- **Good:**
  - `Initial project setup`
  - `Add task management user interface`
  - `Implement task creation functionality`
  - `Implement task completion functionality`
  - `Update project documentation on main branch`
- **Bad:**
  - `fixed stuff`
  - `changes`
  - `wip`
  - `asdfghjk`

### 5.3 Commit Granularity
- Make atomic commits: one logical change per commit.
- Never bundle unrelated changes (e.g., UI redesign and bugfix) into a single commit.

---

## 6. Merge Guidelines

### 6.1 Fast-Forward vs. Non-Fast-Forward (`--no-ff`)
- **Fast-Forward (`git merge <branch>`):** Applied when `main` has not diverged since the feature branch was created. Git simply moves the pointer forward.
- **True Merge Commit (`git merge --no-ff <branch>`):** Enforces creation of a dedicated merge commit, preserving historical evidence that a feature branch existed and was integrated at a specific point in time.

### 6.2 Pre-Merge Checklist
1. Ensure all local changes are committed (`git status` shows clean tree).
2. Fetch or switch to `main` and ensure it is up to date (`git checkout main`).
3. Execute tests or manual validation of the feature.
4. Execute `git merge <feature-branch>`.

---

## 7. Merge Conflict Resolution Procedure

A merge conflict occurs when Git cannot automatically reconcile differences between two branches modifying the same lines of a file.

### Step-by-Step Resolution Protocol:
1. **Identify the Conflict:**
   ```bash
   git status
   ```
   Git will list conflicting files under `Unmerged paths: both modified: <file>`.

2. **Locate Conflict Markers:**
   Open the conflicted file and locate Git's conflict markers:
   ```markdown
   <<<<<<< HEAD
   Content from the current branch (e.g. main)
   =======
   Content from the incoming branch (e.g. feature/task-completion)
   >>>>>>> feature/task-completion
   ```

3. **Collaborative Resolution:**
   Discuss with the author of the conflicting commit. Combine both changes or choose the appropriate logical superset. Remove all markers (`<<<<<<<`, `=======`, `>>>>>>>`).

4. **Verify Application Integrity:**
   Open the application in a browser or test environment to ensure syntax and functionality remain intact.

5. **Stage and Finalize Merge:**
   ```bash
   git add <resolved-file>
   git commit -m "Merge branch '<feature-branch>' into main and resolve merge conflict in <file>"
   ```

6. **Verify Clean Working Tree:**
   ```bash
   git status
   ```
