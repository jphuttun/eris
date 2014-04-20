Documentation of Eris
=====================

# Environment cheatsheet

## Production

+ Web site: erisgame.heroku.com
+ Git repository: master
+ Push to local git: git commit
+ Push to github: git push origin master
+ Push to heroku: git XXX
+ What: Production code

## Staging

+ Web site: erisstaging.heroku.com
+ Git repository: development
+ Push to local git: git commit
+ Push to github: git push origin development
+ Push to heroku: git push staging development:master
+ What: Production test, should be as product like as possible. If tests are ok, code is merged to production

## Playground

+ Web site: erisplayground.heroku.com
+ Git repository: playground
+ Push to local git: git commit
+ Push to github: <no github repository, publish your playground_branch if needed>
+ Push to heroku: git push playground playground_<yourbranch>:master
+ What: You can do here whatever you want
+ Instructions:
	+ Create new branch from source:
		1. Go to source branch
		2. git checkout -b playground_<branchname>, for example: playground_test_two_game_layers
		3. Do your changes and commit them to your branch
		4. No need to push them to github
		5. Push them to heroku
		6. Delete your branch when you don't need it anymore: git branch -D playground_<branchname>

# Git instructions

## Helpful commands

+ Check in which branch you are
	+ git branch <- shows local branches
	+ git branch -a <- shows local and remote branches
+ Change branch
	+ git checkout <branchname>
+ Create new branch, copy existing files from source branch
	+ go to branch you want to copy
	+ git branch -b <branchname>

## Branches
+ Local branches
	+ How to show local branches:
		+ git branch <- shows only local branches
	+ You can have unlimited local branches
	+ Create new branch for each "feature" or bugfix you are developing
	+ Branch copies files from other branch
	+ All branches are in same physical directory. Hidden .git folder has actual files as zipped blobs and when you change branch, it unzips correct branch files to directory
+ Remote branch
	+ How to show remote branches:
		+ git branch -a <- shows local and remote branches
		+ git remote -v <- shows to which remotes local branches point
	+ Usually remote = github
	+ Branches that are in github and visible to others
	+ Master and development are usually remote branches
	+ Remote branch vs local branch - there is no automatic binding, but you usually configure your local master to point to remote master
	+ However these are actually two different branches. You can have different code in local master than remote master, but git notices this and tells that your branch is ahead/behind/divergent from remote branch
+ Heroku branches
	+ Heroku works kind a like github. You can push your code to heroku and even pull it from there if you want
	+ Heroku branches are remote branches, which point to heroku server
	+ When you push stuff to these branches, heroku notices it, compiles code and updates heroku server with your code

## Git merge and rebase
+ Merge
	+ What is merge?
		+ It takes source branch and add target commits on top of that
	+ When to use
		+ Your code is ready
		+ You want to merge your code _to_ another branch, for example development
	+ How it is done
		1. Go to target branch, for example development
		2. git merge <yourbranch>
		3. Solve merge conflicts
+ Rebase
	+ What is rebase?
		+ It takes target branch, removes all your commits, puts source commits and then puts your commits on top of that
	+ When to use
		+ Common example: You have created new branch from development. You are developing your changes when you notice that development has been updated. You want to include those updates in your branch too, either because it will ease merge conflicts or the code in development is something you want to use
		+ In this case rebase is helpful. It will "stash" your changes to safety, then take everything from development and put your commits on top of that. It might cause merge conflicts which you have to solve
		+ This way you can solve merge conflicts everytime new code is pushed to development instead of solving them all once when you merge your code to development
	+ How it is gone
		1. Google: git rebase
		2. Do it
		3. Ready :)

## Git policy

+ Branch names
	+ feature_feature_name_here_with_underscores
	+ hotfix_name_of_hotfix_with_underscores
+ Commit messages
	+ Required
		+ Short one line topic
			+ For example: Fix bug in player selection
	+ Optional
		+ One empty line
		+ Longer explanation what you did (code changes are easily to see from github, no need to explain what files were changed, but _why_)
	+ Fix bug, not fixed, fixes
		+ Don't use past tense: Fixed bug...
		+ Don't use persons: I fixed bug...
		+ Use: Fix bug...
		+ Why? Because git itself uses 'merge with ..., add something ...' -style

