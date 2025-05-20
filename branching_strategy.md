# Branching Strategy

This document outlines the Git branching strategy for the project, designed to support collaborative development while maintaining code quality and stability.

## Overview

The project will follow a modified GitFlow branching strategy, tailored to our development approach and team size. This strategy provides structure for feature development, releases, and hotfixes while ensuring main branch stability.

## Branch Structure

### Primary Branches

| Branch | Purpose | Lifetime | Merge Target | Protection Level |
|--------|---------|----------|--------------|------------------|
| `main` | Production code | Permanent | N/A | High - Requires PR and approval |
| `develop` | Integration branch for features | Permanent | `main` | Medium - Requires PR |

### Supporting Branches

| Branch Type | Naming Convention | Purpose | Source Branch | Target Branch | Lifetime |
|------------|-------------------|---------|--------------|--------------|----------|
| Feature | `feature/<feature-name>` | New functionality | `develop` | `develop` | Temporary |
| Release | `release/v<version>` | Release preparation | `develop` | `main` & `develop` | Temporary |
| Hotfix | `hotfix/<issue-name>` | Production fixes | `main` | `main` & `develop` | Temporary |
| Documentation | `docs/<doc-name>` | Documentation updates | `develop` | `develop` | Temporary |
| Architectural | `arch/<component-name>` | Architectural changes | `develop` | `develop` | Temporary |

## Workflow Guidelines

### Feature Development

1. Create a feature branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b feature/feature-name
   ```

2. Implement changes with regular commits
3. Push feature branch to remote:
   ```
   git push -u origin feature/feature-name
   ```
   
4. When feature is complete, create a Pull Request to `develop`
5. After code review and approval, merge to `develop`

### Release Process

1. Create a release branch when `develop` contains all features for the release:
   ```
   git checkout develop
   git pull
   git checkout -b release/v1.0.0
   ```

2. Perform final testing and bug fixes on release branch
3. When ready for release:
   - Merge to `main` via Pull Request
   - Tag the release on `main`:
     ```
     git checkout main
     git pull
     git tag -a v1.0.0 -m "Release v1.0.0"
     git push origin v1.0.0
     ```
   - Merge back to `develop` to include any release fixes

### Hotfix Process

1. Create hotfix branch from `main`:
   ```
   git checkout main
   git pull
   git checkout -b hotfix/critical-issue
   ```

2. Implement fix with focused commits
3. When complete:
   - Merge to `main` via Pull Request
   - Tag the updated version on `main`
   - Merge to `develop` to include the fix in future releases

## Branch Protection Rules

To maintain code quality, the following protection rules should be implemented:

1. `main` branch:
   - Require pull request and approval before merging
   - Require status checks to pass before merging
   - Restrict push access to administrators

2. `develop` branch:
   - Require pull request before merging
   - Require status checks to pass before merging

## Commit Message Guidelines

All commits should follow a consistent format to improve readability and generate meaningful changelogs:

```
<type>(<scope>): <short summary>

<body>

<footer>
```

Types include:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code restructuring without behavior change
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

Example:
```
feat(ritual-guide): add step navigation controls

Implement forward/back navigation in the ritual guide component
with progress tracking.

Closes #42
```

## Phase-Specific Branching

During each phase of development, branches will be organized as follows:

1. **Specification Phase**:
   - Documentation branches (`docs/user-stories`, etc.)

2. **Pseudocode and Architecture Phase**:
   - Architecture branches (`arch/data-model`, `arch/component-structure`)
   - Documentation branches for technical specifications

3. **Implementation Phase**:
   - Feature branches for each component/feature
   - Integration branches for complex features

4. **Testing and Refinement Phase**:
   - Bug fix branches (`fix/issue-name`)
   - Performance branches (`perf/component-name`)

5. **Deployment Phase**:
   - Release branches for each milestone
   - Hotfix branches as needed

## Conflict Resolution

When conflicts arise during merges:
1. The feature owner is responsible for resolving conflicts in their feature branch
2. For complex conflicts, pair programming sessions should be scheduled
3. When in doubt, prioritize the approach that best preserves system integrity and user experience

This branching strategy will be reviewed and potentially refined at the completion of each development phase. 