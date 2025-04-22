1. create empty branch
`git switch --orphan <name>`


2. merge orphan to master
`git pull origin <name> --allow-unrelated-histories`