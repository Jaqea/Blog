#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
sed -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:7revor/7revor.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# sed -i'' "s~git@github.com:~https://s~git@github.com:~https://${GIT_REPO_TOKEN}@github.com/~"
git remote add origin https://${GIT_REPO_TOKEN}@github.com/Jaqea/Blog.git
git pull origin master

# 如果使用 travis 持续集成
git push origin master:gh-pages

cd -
