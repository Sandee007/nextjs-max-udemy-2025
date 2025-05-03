1. create empty branch
`git switch --orphan <name>`

2. add files, commit and push to origin

3. merge orphan to master
`git pull origin <name> --allow-unrelated-histories`