# Git commands

Converting a project to git

```jsx
git init
git add .
```

Local commit:

```jsx
git commit -m "Initial commit - Vishwakesari website"
```

Push to remote

```jsx
git remote add origin https://github.com/USERNAME/vishwakesari-website.git
git branch -M main
git push -u origin main
```

Commit and push

```jsx
git commit -m "Add gitignore"
git push
```

Update local branch from main

```jsx
git checkout main
git pull origin main
```

Creating new branch

```jsx
git checkout -b feature/new-page-about-us
git branch
```

To commit changes in new branch

```jsx
git add .
git commit -m "Add new About page with layout and routing"
```

Push new branch to origin

```jsx
git push -u origin feature/new-page-about-us
```

Merge PR

1. Go to GitHub.
2. Open your repository.
3. You will see a “Compare & pull request” button.
4. Create Pull Request.
5. Review changes.
6. Click “Merge”.
7. Delete the feature branch (optional).

Then locally:

```jsx
git checkout main
git pull origin main
```

#### Cloning a repo

git clone https://github.com/mangeshk138/speaknest-institute-main.git



git status
git branch -a
git remote -v

-------------------------

git checkout main

git pull origin main

----

git checkout feature/updated-travel-notes

git pull origin feature/updated-travel-notes