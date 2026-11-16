# DevOps Practical Examination Report

**Course:** B.Tech Computer Science & Engineering (CSE)  
**Subject:** DevOps / Software Engineering Laboratory  
**Experiment Title:** Practical Demonstration of Git Version Control, Fundamentals, and Branching Strategies  
**Candidate / Demonstration Project:** `TeamProject` (Team Task Management Application)  
**Date of Execution:** 16th November 2026  

---

## 1. Aim
To demonstrate complete, real-world source code management and collaborative branching workflows for a multi-developer team using Git, including repository initialization, feature branch isolation, atomic commit authoring, fast-forward and non-fast-forward merges, intentional creation and manual resolution of merge conflicts, and historical analysis via Git log visual graph inspection.

---

## 2. Problem Statement
A development team consisting of three engineers is assigned to construct a **Team Task Management Application** (`TeamProject`). To prevent collision, overwrites, and unstable builds, a robust Git workflow is required:
- Developer 1: UI scaffolding (`feature/task-ui`).
- Developer 2: Task creation functionality (`feature/add-task`).
- Developer 3: Task completion and status management (`feature/task-completion`).

The workflow must showcase feature branch merges, conflict detection, manual resolution, and clean topological history preservation.

---

## 3. Software Requirements & System Environment
- **Operating System:** Microsoft Windows 11
- **Command Shell:** PowerShell / Git Bash
- **Version Control System:** Git 2.40+ (Distributed VCS)
- **Runtime / Environment:** Any modern web browser (Edge, Chrome, Firefox)
- **Frontend Stack:** HTML5, CSS3, Vanilla ES6+ JavaScript (Zero external framework dependencies)

---

## 4. Git Branching Strategy Adopted
The team utilized an adapted **Feature Branch Workflow** consisting of:
1. `main`: The single authoritative production branch containing tested, deployable software.
2. `feature/task-ui`: Developer 1's isolated workspace for layout and presentation.
3. `feature/add-task`: Developer 2's workspace for state models and event listeners.
4. `feature/task-completion`: Developer 3's workspace for item toggle and removal lifecycle.

---

## 5. Implementation Procedure & Executed Commands

### Step 1: Initializing Repository
```bash
git init
git branch -m main
git config user.name "Senior DevOps Engineer"
git config user.email "devops@teamproject.local"
git add .
git commit -m "Initial project setup"
```
*Result:* Established `00581d4` as the root commit on `main`.

### Step 2: Developer 1 Feature Implementation
```bash
git checkout -b feature/task-ui
# Modified index.html and style.css
git add index.html style.css
git commit -m "Add task management user interface"
```
*Result:* Recorded commit `640c478`.

### Step 3: Developer 2 Feature Implementation
```bash
git checkout -b feature/add-task
# Modified script.js (task creation form listeners and dynamic DOM creation)
git add script.js
git commit -m "Implement task creation functionality"
```
*Result:* Recorded commit `f1bec51`.

### Step 4: Developer 3 Feature Implementation
```bash
git checkout -b feature/task-completion
# Modified script.js and style.css (checkboxes, status pills, delete handler)
git add script.js style.css
git commit -m "Implement task completion functionality"
```
*Result:* Recorded commit `6ef1b74`.

### Step 5: Integration Merges
```bash
git checkout main
git merge feature/task-ui
# Fast-forwarded main to 640c478

git merge feature/add-task --no-ff -m "Merge branch 'feature/add-task' into main"
# Created merge commit f59b655
```

### Step 6: Intentional Merge Conflict Creation
1. On `main`:
   ```bash
   # Edited architecture note in README.md
   git add README.md
   git commit -m "Update project documentation on main branch"
   ```
   *(Commit: `ecdc10a`)*

2. On `feature/task-completion`:
   ```bash
   git checkout feature/task-completion
   # Edited the exact same architecture note in README.md
   git add README.md
   git commit -m "Update project documentation on feature/task-completion branch"
   ```
   *(Commit: `9909d85`)*

3. Merging back on `main`:
   ```bash
   git checkout main
   git merge feature/task-completion
   ```
   *Terminal Output:*
   ```text
   Auto-merging README.md
   CONFLICT (content): Merge conflict in README.md
   Automatic merge failed; fix conflicts and then commit the result.
   ```

### Step 7: Conflict Resolution
The conflict markers in `README.md` were inspected:
```markdown
<<<<<<< HEAD
Updated on main branch: The application follows a modular vanilla frontend architecture with strict separation of concerns across HTML5, CSS3, and JavaScript components. Main branch contains stable and reviewed production-ready code.
=======
Updated on feature/task-completion branch by Developer 3: Enhanced task workflow model featuring interactive status toggling, complete/pending counters, dynamic DOM state management, and real-time task lifecycle handling.
>>>>>>> feature/task-completion
```

The conflict was resolved by merging both contributions into a unified architecture statement, removing all conflict markers, staging the file, and completing the merge:
```bash
git add README.md
git commit -m "Merge branch 'feature/task-completion' into main and resolve merge conflict in README.md"
```
*(Commit: `85a8dd3`)*

---

## 6. Git Commit Graph & History Verification

Executing `git log --oneline --graph --all`:

```text
*   85a8dd3 Merge branch 'feature/task-completion' into main and resolve merge conflict in README.md
|\  
| * 9909d85 Update project documentation on feature/task-completion branch
| * 6ef1b74 Implement task completion functionality
* | ecdc10a Update project documentation on main branch
* | f59b655 Merge branch 'feature/add-task' into main
|\| 
| * f1bec51 Implement task creation functionality
|/  
* 640c478 Add task management user interface
* 00581d4 Initial project setup
```

Executing `git branch -v`:
```text
  feature/add-task        f1bec51 Implement task creation functionality
  feature/task-completion 9909d85 Update project documentation on feature/task-completion branch
  feature/task-ui         640c478 Add task management user interface
* main                    85a8dd3 Merge branch 'feature/task-completion' into main and resolve merge conflict in README.md
```

Executing `git status`:
```text
On branch main
nothing to commit, working tree clean
```

---

## 7. Evidence Artifacts
Screenshots and visual evidence logs are stored in:
- `evidence/screenshots/`
  1. `01_initial_repo_creation.png` – Initial repository initialization and root commit.
  2. `02_branch_creation.png` – Creation of isolated feature branches.
  3. `03_feature_commits.png` – Meaningful atomic commits per developer.
  4. `04_merge_conflict_markers.png` – Git status and 3-way conflict markers in `README.md`.
  5. `05_conflict_resolved.png` – Cleaned file content post-manual resolution.
  6. `06_successful_merge.png` – Finalizing the merge commit.
  7. `07_git_commit_graph.png` – Multi-branch topological ASCII graph (`git log --graph`).
  8. `08_final_git_status.png` – Clean working tree and all branch references.

---

## 8. Result and Conclusion
All objectives specified in Problem Statement 1 were successfully executed and verified:
1. A clean, responsive, single-page Team Task Management application was developed with zero external dependencies.
2. A formal branching strategy document (`BRANCHING_STRATEGY.md`) and operational workflow guide (`GIT_WORKFLOW.md`) were drafted and implemented.
3. Feature branches were managed for three distinct developers, showcasing atomic commits with imperative messages.
4. A genuine merge conflict was reproduced, analyzed with conflict markers, manually resolved, and merged into `main`.
5. The commit topology demonstrates a clear branching graph, preserving full auditability.
The experiment demonstrates production-grade DevOps version control discipline suitable for academic examinations and professional software engineering teams.
