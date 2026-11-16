# Merge Conflict Creation and Resolution Report

**Project:** TeamProject  
**Date:** 2026-11-16  
**Target File:** `README.md`  
**Conflicting Branches:** `main` and `feature/task-completion`

---

## 1. Concept of a Merge Conflict
A merge conflict occurs in Git when two separate branches modify the exact same lines of a file, or when a file is deleted in one branch and modified in another. Because Git cannot make an automated editorial decision about which change is authoritative, it pauses the merge, inserts conflict markers into the file, and hands control over to the engineer.

---

## 2. Intentional Conflict Recreation Procedure

To fulfill the DevOps lab demonstration criteria, a real merge conflict was created between the production branch (`main`) and Developer 3's branch (`feature/task-completion`).

### Step 1: Modifying `README.md` on `main`
On the `main` branch, the `## Project Description & Architecture` section was introduced:
```markdown
## Project Description & Architecture
Updated on main branch: The application follows a modular vanilla frontend architecture with strict separation of concerns across HTML5, CSS3, and JavaScript components. Main branch contains stable and reviewed production-ready code.
```
Committed with:
```bash
git add README.md
git commit -m "Update project documentation on main branch"
```
*(Commit hash: `ecdc10a`)*

### Step 2: Modifying the Same Section on `feature/task-completion`
Switching to `feature/task-completion`:
```bash
git checkout feature/task-completion
```
The exact same section was written differently by Developer 3:
```markdown
## Project Description & Architecture
Updated on feature/task-completion branch by Developer 3: Enhanced task workflow model featuring interactive status toggling, complete/pending counters, dynamic DOM state management, and real-time task lifecycle handling.
```
Committed with:
```bash
git add README.md
git commit -m "Update project documentation on feature/task-completion branch"
```
*(Commit hash: `9909d85`)*

---

## 3. Merge Execution and Resulting Conflict

Switching back to `main` and merging:
```bash
git checkout main
git merge feature/task-completion
```

### Actual Terminal Output:
```text
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

Checking status with `git status`:
```text
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
	modified:   script.js
	modified:   style.css

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   README.md
```

---

## 4. Conflict Markers in `README.md`

Opening `README.md` revealed Git's 3-way conflict markers:

```markdown
<<<<<<< HEAD
Updated on main branch: The application follows a modular vanilla frontend architecture with strict separation of concerns across HTML5, CSS3, and JavaScript components. Main branch contains stable and reviewed production-ready code.
=======
Updated on feature/task-completion branch by Developer 3: Enhanced task workflow model featuring interactive status toggling, complete/pending counters, dynamic DOM state management, and real-time task lifecycle handling.
>>>>>>> feature/task-completion
```

### Marker Breakdown:
- `<<<<<<< HEAD`: Marks the beginning of conflicting changes present on the branch you are currently on (`main`).
- `=======`: The separator between local changes and incoming changes.
- `>>>>>>> feature/task-completion`: Marks the end of conflicting changes originating from the branch being merged in.

---

## 5. Resolution Strategy and Final Code

Rather than discarding either developer's input, the standard DevOps collaborative strategy was applied: synthesizing the architectural context of `main` with the functional details of `feature/task-completion`.

### Final Resolved Section (No Conflict Markers):
```markdown
## Project Description & Architecture
The application follows a modular vanilla frontend architecture with strict separation of concerns across HTML5, CSS3, and JavaScript components. Main branch contains stable, reviewed production-ready code with an enhanced task workflow model featuring interactive status toggling, complete/pending counters, dynamic DOM state management, and real-time task lifecycle handling.
```

---

## 6. Staging and Completing the Merge

After saving the resolved file:
```bash
# 1. Stage the resolved file
git add README.md

# 2. Check status to verify resolution
git status
# Output: All conflicts fixed but you are still merging.

# 3. Finalize the merge commit
git commit -m "Merge branch 'feature/task-completion' into main and resolve merge conflict in README.md"
```
*(Merge commit hash: `85a8dd3`)*

---

## 7. Key Takeaways for Students
1. **Never panic upon seeing conflict markers**: Conflicts are a standard part of multi-developer source control.
2. **Never commit raw conflict markers**: Committing files containing `<<<<<<<` or `>>>>>>>` breaks builds and causes production downtime.
3. **Communicate across teams**: When resolving non-trivial conflicts, consult the code authors to avoid silent regressions.
4. **Always test after resolution**: Verify that scripts run and the page renders cleanly before committing the merge.
