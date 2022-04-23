React自制脚手架（ts版本）
================

React自用脚手架（其实稍微改一下，用在别的mvvm框架上面也可以）

## 包含的配置

1. typescript
1. 真丶antd按需加载（[这个插件](https://github.com/NiceLabs/ts-import-plugin)也支持其他的按需加载，请按需要配置）
1. ts-lint（没加什么规则）
1. 研发阶段修改代码支持热部署
1. 构建阶段，自动填写html标签来引入js，支持chunkhash，可以在构建后自动复制一些静态资源到构建目录
1. babel 7
1. css module + less + autoprefixer
1. url loader
1. git commit采用[AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
1. 自定义githook（预先写了两个hook），并且强制在提交之前运行`ts-lint`语法检查和commit规范检查

## 使用方法

### 初始化

先`clone`本项目，然后

```sh
cd react-ts-boilerplate
git init
npm i
```

### 开始研发

```sh
# 研发之前先在后台运行这个
npm run watch
# 开始研发
npm run start
# 运行语法风格检查
npm run lint
# 提交代码（如果对Angular的commit msg不熟悉，请运行这个）
git add $file
npm run cz
# 生成changelog
npm run changelog
```

### 构建项目

如果你需要一些其他功能（比如复制指定资源到指定目录），先自行修改`webpack.production.config.ts`，然后运行

```sh
npm run build
```

## 注意

1. 不要在项目内包含js和jsx文件，因为它们被我加入`.gitignore`了
1. 运行git的时候，不要忽略hook
1. ~~使用antd的要注意，如果引用了`Icon`组件，请查看/src下的`icon.ts`的说明。这个文件在任何时候都不要删除（即使你没有用到它）~~ antd升级了他们的策略，现在图标不会无脑加载了
