---
title: javascript工程项目的一系列最佳实践
tags:
  - 前端规范
  - 最佳实践
categories: front-end
abbrlink: 1adc5a41
date: 2018-01-28 20:36:43
---

> 来源于互联网

## 1.git

### 1.1 一些git规则

> 这里有一套规则要牢记

**在功能分支中执行开发工作**

- 因为这样，所有的工作都是在专用的分支而不是在主分支上隔离完成的。它允许您提交多个 `pull request` 而不会导致混乱。您可以持续迭代提交，而不会使得那些很可能还不稳定而且还未完成的代码污染 `master` 分支
    
**从 `develop` 独立出分支**

- 这样，您可以保持 `master` 分支中的代码稳定性，这样就不会导致构建问题，并且几乎可以直接用于发布
  
**永远也不要将分支（直接）推送到 develop 或者 master
，请使用合并请求（Pull Request）**

- 通过这种方式，它可以通知整个团队他们已经完成了某个功能的开发。这样开发伙伴就可以更容易对代码进行 code review，同时还可以互相讨论所提交的需求功能
  
**在推送所开发的功能并且发起合并请求前，请更新您本地的develop分支并且完成交互式变基操作（interactive rebase）**

 - ebase 操作会将（本地开发分支）合并到被请求合并的分支（ master 或 develop ）中，并将您本地进行的提交应用于所有历史提交的最顶端，而不会去创建额外的合并提交（假设没有冲突的话），从而可以保持一个漂亮而干净的历史提交记录
  
**请确保在变基并发起合并请求之前解决完潜在的冲突**

- 合并分支后删除本地和远程功能分支
  - 如果不删除需求分支，大量僵尸分支的存在会导致分支列表的混乱。而且该操作还能确保有且仅有一次合并到master 或 develop。只有当这个功能还在开发中时对应的功能分支才存在
  
**在进行合并请求之前，请确保您的功能分支可以成功构建，并已经通过了所有的测试（包括代码规则检查）**

- 因为您即将将代码提交到这个稳定的分支。而如果您的功能分支测试未通过，那您的目标分支的构建有很大的概率也会失败。此外，确保在进行合并请求之前应用代码规则检查。因为它有助于我们代码的可读性，并减少格式化的代码与实际业务代码更改混合在一起导致的混乱问题
  
**使用 这个 `.gitignore `文件**

 - 此文件已经囊括了不应该和您开发的代码一起推送至远程仓库（remote repository）的系统文件列表。另外，此文件还排除了大多数编辑器的设置文件夹和文件，以及最常见的（工程开发）依赖目录
  
**保护您的 develop 和 master 分支**

- 这样可以保护您的生产分支免受意外情况和不可回退的变更
  
### 1.2 git 工作流

> 基于以上原因, 我们将 功能分支工作流 ， 交互式变基的使用方法 结合一些 gitflow中的基础 (比如，命名和使用一个develop branch)一起使用。 主要步骤如下

**针对一个新项目, 在您的项目目录初始化您的项目。 如果是（已有项目）随后的功能开发/代码变动，这一步请忽略**

```
cd <项目目录>
git init
```

**检出（Checkout） 一个新的功能或故障修复（feature/bug-fix）分支**

```
git checkout -b <分支名称>
```

**新增代码变更**

> git commit -a 会独立启动一个编辑器用来编辑您的说明信息，这样的好处是可以专注于写这些注释说明

```
git add
git commit -a
```

**（切换至功能分支并且）通过交互式变基从您的develop分支中获取最新的代码提交，以更新您的功能分支**

> 您可以使用 --autosquash 将所有提交压缩到单个提交。没有人会愿意（看到） develop 分支中的单个功能开发就占据如此多的提交历史

```
git checkout <branchname>
git rebase -i --autosquash develop
```

**如果没有冲突请跳过此步骤，如果您有冲突, 就需要解决它们并且继续变基操作**

```
git add <file1> <file2> ...
git rebase --continue
```

**推送您的（功能）分支。变基操作会改变提交历史, 所以您必须使用 -f 强制推送到远程（功能）分支。 如果其他人与您在该分支上进行协同开发，请使用破坏性没那么强的 --force-with-lease 参数**

> 当您进行 rebase 操作时，您会改变功能分支的提交历史。这会导致 git 拒绝正常的 git push 。那么，您只能使用 -f 或 --force 参数了

```
git push -f
```

**提交一个合并请求（Pull Request）**

**Pull Request 会被负责代码审查的同事接受，合并和关闭**

**如果您完成了开发，请记得删除您的本地分支。**

```
git branch -d <分支>
```

**（使用以下代码）删除所有已经不在远程仓库维护的分支**

```js
git fetch -p && for branch in `git branch -vv | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
```

### 1.3 如何写好 Commit Message

> 坚持遵循关于提交的标准指南，会让在与他人合作使用 git 时更容易。这里有一些经验法则 

**用新的空行将标题和主体两者隔开**

> git 非常聪明，它可将您提交消息的第一行识别为摘要。实际上，如果您尝试使用 git shortlog ，而不是 git log ，您会看到一个很长的提交消息列表，只会包含提交的 id 以及摘要（，而不会包含主体部分）

**将标题行限制为50个字符，并将主体中一行超过72个字符的部分折行显示**

> 提交应尽可能简洁明了，而不是写一堆冗余的描述

**标题首字母大写**

**不要用句号结束标题**

**使用主体部分去解释 是什么 和 为什么 而不是 怎么做**

## 2. 文档

- 可以使用这个 模板 作为 [README （的一个参考）](https://github.com/wearehive/project-guidelines/blob/master/README.sample.md)
- 对于具有多个存储库的项目，请在各自的 README 文件中提供它们的链接
- 随项目的进展，持续地更新 README
- 给您的代码添加详细的注释，这样就可以清楚每个主要部分的含义
- 不要把注释作为坏代码的借口。保持您的代码干净整洁
- 也不要把那些清晰的代码作为不写注释的借口
- 当代码更新，也请确保注释的同步更新

## 3. 环境

**如果需要，请分别定义 development, test 和 production 三个环境**

> 不同的环境可能需要不同的数据、token、api、端口等。您可能需要一个隔离的 development 环境，它调用 mock 的 api，mock 会返回可预测的数据，使自动和手动测试变得更加容易。或者您可能只想在 production 环境中才启用 Google Analytics（分析）

**依据不同的环境变量加载部署的相关配置，不要将这些配置作为常量添加到代码库中**

> - 您会有令牌，密码和其他有价值的信息。这些配置应正确地从应用程序内部分离开来，这样代码库就可以随时独立发布，不会包含这些敏感配置信息
> - 怎么做： 使用 .env 文件来存储环境变量，并将其添加到 .gitignore 中使得排除而不被提交（到仓库）。另外，再提交一个 .env.example 作为开发人员的参考配置。对于生产环境，您应该依旧以标准化的方式设置环境变量

**建议您在应用程序启动之前校验一下环境变量** 

> 它可能会将其他人从上小时的故障排查中解救

```js
const joi = require('joi')

const envVarsSchema = joi.object({  
  NODE_ENV: joi.string()
    .valid(['development', 'production', 'test', 'provision'])
    .required(),
  PORT: joi.number()
    .required(),
  LOGGER_LEVEL: joi.string()
    .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)  
if (error) {  
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {  
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  },
  server: {
    port: envVars.PORT
  }
  // ...
}

module.exports = config;
```

### 3.1 一致的开发环境

**在 package.json 里的 engines 中设置您的node版本**

- 让其他人可以清晰的知道这个项目中用的什么node版本

**另外，使用 nvm 并在您的项目根目录下创建一个 .nvmrc 文件。不要忘了在文档中标注**

> 任何使用nvm的人都可以使用 nvm use 来切换到合适的node版本

**最好设置一个检查 `node` 和 `npm` 版本的 `preinstall` 脚本**

> 某些依赖项可能会在新版本的 npm 中安装失败。

**如果可以的话最好使用 Docker 镜像**

> 它可以在整个工作流程中为您提供一致的环境，而且不用花太多的时间来解决依赖或配置


**使用本地模块，而不是使用全局安装的模块**

> 您不能指望您的同事在自己的全局环境都安装了相应的模块，本地模块可以方便您分享您的工具


### 3.2 依赖一致性

**确保您的团队成员获得与您完全相同的依赖。**

> - 因为您希望代码在任何开发环境中运行都能像预期的一样
> - 在`npm@5`或者更高版本中使用 `package-lock.json`


- 我们没有 `npm@5`
  - 或者，您可以使用 `yarn` ，并确保在 `README.md` 中标注了使用 yarn 。您的锁文件和`package.json`在每次依赖关系更新后应该具有相同的版本
  
- 我不太喜欢 `Yarn`
  - 不喜欢 `Yarn`，太糟糕了。对于旧版本的`npm`，在安装新的依赖关系时使用 `-save --save-exact` ，并在发布之前创建`npm-shrinkwrap.json`
  
## 4. 依赖

**持续跟踪您当前的可用依赖包: 举个例子, `npm ls --depth=0`**

**查看这些软件包是否未使用或者与开发项目无关: depcheck**

> 您可能会在代码中包含未使用的库，这会增大生产包的大小。请搜索出这些未使用的依赖关系并去掉它们吧

**在使用依赖之前，请检查他的下载统计信息，看看它是否被社区大量使用： npm-stat**

> 更多的使用量很大程度上意味着更多的贡献者，这通常意味着拥有更好的维护，这些能确保错误能够被快速地发现并修复

**在使用依赖之前，请检查它是否具有良好而成熟的版本发布频率与大量的维护者：例如， npm view async**

> 如果维护者没有足够快地合并修补程序，那么这些贡献者也将会变得不积极不高效

**如果需要使用那些不太熟悉的依赖包，请在使用之前与团队进行充分讨论**

**始终确保您的应用程序在最新版本的依赖包上面能正常运行，而不是无法使用：npm outdated**

> 依赖关系更新有时包含破坏性更改。当显示需要更新时，请始终先查看其发行说明。并逐一地更新您的依赖项，如果出现任何问题，可以使故障排除更容易。可以使用类似 npm-check-updates 的酷炫工具


## 5. 测试

**如果需要，请构建一个 test 环境.**

> 虽然有时在 production 模式下端到端测试可能看起来已经足够了，但有一些例外：比如您可能不想在生产环境下启用数据分析功能，只能用测试数据来填充（污染）某人的仪表板。另一个例子是，您的api可能在 production 中才具有速率限制，并在请求达到一定量级后会阻止您的测试请求


**将测试文件放在使用 * .test.js 或 * .spec.js 命名约定的测试模块，比如 moduleName.spec.js**

> 您肯定不想进入一个层次很深的文件夹结构来查找里面的单元测试

**将其他测试文件放入独立的测试文件夹中以避免混淆**

> 一些测试文件与任何特定的文件实现没有特别的关系。您只需将它放在最有可能被其他开发人员找到的文件夹中：__test__ 文件夹。这个名字：__test__也是现在的标准，被大多数javascript测试框架所接受


**编写可测试代码，避免副作用（side effects），提取副作用，编写纯函数**

- 您想要将业务逻辑拆分为单独的测试单元。您必须“尽量减少不可预测性和非确定性过程对代码可靠性的影响”
- 纯函数是一种总是为相同的输入返回相同输出的函数。相反地，不纯的函数是一种可能会有副作用，或者取决于来自外部的条件来决定产生对应的输出值的函数。这使得它不那么可预测

**使用静态类型检查器**

- 有时您可能需要一个静态类型检查器。它为您的代码带来一定程度的可靠性

**先在本地 develop 分支运行测试，待测试通过后，再进行pull请求**

- 您不想成为一个导致生产分支构建失败的人吧。在您的rebase之后运行测试，然后再将您改动的功能分支推送到远程仓库。

**记录您的测试，包括在 README 文件中的相关说明部分**

- 这是您为其他开发者或者 DevOps 专家或者 QA 或者其他如此幸运能和您一起协作的人留下的便捷笔记



## 6. 结构布局与命名

**请围绕产品功能/页面/组件，而不是围绕角色来组织文件。此外，请将测试文件放在他们对应实现的旁边**

- 不规范
  
```
.
├── controllers
|   ├── product.js
|   └── user.js
├── models
|   ├── product.js
|   └── user.js
```

- 规范

```
.
├── product
|   ├── index.js
|   ├── product.js
|   └── product.test.js
├── user
|   ├── index.js
|   ├── user.js
|   └── user.test.js
```

> 比起一个冗长的列表文件，创建一个单一责权封装的小模块，并在其中包括测试文件。将会更容易浏览，更一目了然


**将其他测试文件放在单独的测试文件夹中以避免混淆**

- 这样可以节约您的团队中的其他开发人员或DevOps专家的时间

**使用 ./config 文件夹，不要为不同的环境制作不同的配置文件。**

> 当您为不同的目的（数据库，api等）分解不同的配置文件;将它们放在具有容易识别名称（如 config ）的文件夹中才是有意义的。请记住不要为不同的环境制作不同的配置文件。这样并不是具有扩展性的做法，如果这样，就会导致随着更多应用程序部署被创建出来，新的环境名称也会不断被创建，非常混乱。 配置文件中使用的值应通过环境变量提供


**将脚本文件放在./scripts文件夹中。包括 bash 脚本和 node 脚本。**

- 很可能最终会出现很多脚本文件，比如生产构建，开发构建，数据库feeders，数据库同步等

**将构建输出结果放在./build文件夹中。将build/添加到.gitignore中以便忽略此文件夹**

> 命名为您最喜欢的就行，dist看起来也蛮酷的。但请确保与您的团队保持一致性。放置在该文件夹下的东西应该是已经生成（打包、编译、转换）或者被移到这里的。您产生什么编译结果，您的队友也可以生成同样的结果，所以没有必要将这些结果提交到远程仓库中。除非您故意希望提交上去。


**文件名和目录名请使用 PascalCase camelCase 风格。组件请使用 PascalCase 风格**

**CheckBox/index.js 应该代表 CheckBox 组件，也可以写成 CheckBox.js ，但是不能写成冗长的 CheckBox/CheckBox.js 或 checkbox/CheckBox.js**

**理想情况下，目录名称应该和 index.js 的默认导出名称相匹配。**

- 这样您就可以通过简单地导入其父文件夹直接使用您预期的组件或模块

## 7. 代码风格

### 7.1 若干个代码风格指导

**对新项目请使用 Stage2 和更高版本的 javascript（现代化）语法。对于老项目，保持与老的语法一致，除非您打算把老的项目也更新为现代化风格**

- 这完全取决于您的选择。我们使用转换器来使用新的语法糖。Stage2更有可能最终成为规范的一部分，而且仅仅只需经过小版本的迭代就会成为规范

**在构建过程中包含代码风格检查**

- 在构建时中断下一步操作是一种强制执行代码风格检查的方法。强制您认真对待代码。请确保在客户端和服务器端代码都执行代码检查

**使用 ESLint - Pluggable javascript linter 去强制执行代码检查**

- 我们个人很喜欢 eslint ，不强制您也喜欢。它拥有支持更多的规则，配置规则的能力和添加自定义规则的能力

**针对 javascript 我们使用Airbnb javascript Style Guide , 更多请阅读。 请依据您的项目和您的团队选择使用所需的javascript 代码风格**

**当使用FlowType的时候，我们使用 ESLint的Flow样式检查规则。**

- Flow 引入了很少的语法，而这些语法仍然需要遵循代码风格并进行检查

**使用 .eslintignore 将某些文件或文件夹从代码风格检查中排除**

- 当您需要从风格检查中排除几个文件时，就再也不需要通过 eslint-disable 注释来污染您的代码了

**在Pull Request之前，请删除任何 eslint 的禁用注释**

- 在处理代码块时禁用风格检查是正常现象，这样就可以关注在业务逻辑。请记住把那些 eslint-disable 注释删除并遵循风格规则

**根据任务的大小使用 //TODO： 注释或做一个标签（ticket）**

> 这样您就可以提醒自己和他人有这样一个小的任务需要处理（如重构一个函数或更新一个注释）。对于较大的任务，可以使用由一个lint规则（no-warning-comments）强制要求其完成（并移除注释）的//TODO（＃3456），其中的#3456号码是一个标签（ticket），方便查找且防止相似的注释堆积导致混乱

**随着代码的变化，始终保持注释的相关性。删除那些注释掉的代码块**

- 代码应该尽可能的可读，您应该摆脱任何分心的事情。如果您在重构一个函数，就不要注释那些旧代码，直接把要注释的代码删除吧

**避免不相关的和搞笑的的注释，日志或命名**

**请使用有意义容易搜索的命名，避免缩写名称。对于函数使用长描述性命名。功能命名应该是一个动词或动词短语，需要能清楚传达意图的命名。**

**依据《代码整洁之道》的step-down规则，对您的源代码文件中的函数（的声明）进行组织。高抽象级别的函数（调用了低级别函数的函数）在上，低抽象级别函数在下，（保证了阅读代码时遇到未出现的函数仍然是从上往下的顺序，而不会打断阅读顺序地往前查找并且函数的抽象层次依次递减）。**



### 7.2 强制的代码风格标准

**让您的编辑器提示您关于代码风格方面的错误。 请将 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) 与 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 和您目前的ESLint配置一起搭配使用**

**考虑使用git钩子**

- git的钩子能大幅度地提升开发者的生产力。在做出改变、提交、推送至暂存区或者生产环境的过程中（充分检验代码），再也不需要担心（推送的代码会导致）构建失败

**将git的precommit钩子与Prettier结合使用**

> 虽然prettier自身已经非常强大，但是每次将其作为单独的一个npm任务去格式化代码，并不是那么地高效。 这正是lint-staged（还有husky）可以解决的地方。关于如何配置 lint-staged 请阅读这里 以及如何配置 husky 请阅读

## 8. 日志

**避免在生产环境中使用客户端的控制台日志**

- 您在构建过程可以把（应该）它们去掉，但是请确保您在代码风格检查中提供了有关控制台日志的警告信息。
  
**产出生产环境的可读生产日志记录。一般使用在生产模式下所使用的日志记录库 (比如 winston 或者 node-bunyan)。**

> 它通过添加着色、时间戳、log到控制台或者文件中，甚至是夜以继日地轮流log到文件，来减少故障排除中那些令人不愉快的事情。

## 9. api

### 9.1 api 设计

- 因为我们试图实施开发出结构稳健的 Restful 接口，让团队成员和客户可以简单而一致地使用它们
- 缺乏一致性和简单性会大大增加集成和维护的成本。这就是为什么api设计这部分会包含在这个文档中的原因

**我们主要遵循资源导向的设计方式。它有三个主要要素：资源，集合和 URLs**

- 资源具有数据，嵌套，和一些操作方法。
- 一组资源称为一个集合。
- `URL`标识资源或集合的线上位置

> 这是针对开发人员（您的主要api使用者）非常著名的设计方式。除了可读性和易用性之外，它还允许我们在无需了解api细节的情况下编写通用库和一些连接器

- 使用`kebab-case`（短横线分割）的`URL`。
- 在查询字符串或资源字段中使用`camelCase`模式。
- 在URL中使用多个`kebab-case`作为资源名称。
- 总是使用复数名词来命名指向一个集合的`url：/users`

> 基本上，它可读性会更好，并可以保持URL的一致性。

**在源代码中，将复数转换为具有列表后缀名描述的变量和属性**

> 复数形式的URL非常好，但在源代码中使用它却很微妙而且容易出错，所以要小心谨慎。

**坚持这样一个概念：始终以集合名起始并以标识符结束**

```js
/students/245743
/airports/kjfk
```

**避免这样的网址**

```js
GET /blogs/:blogId/posts/:postId/summary
```

**这不是在指向资源，而是在指向属性。您完全可以将属性作为参数传递，以减少响应**

**URLs里面请尽量少用动词**

> 因为如果您为每个资源操作使用一个动词，您很快就会维护一个很大的URL列表，而且没有一致的使用模式，这会使开发人员难以学习。此外，我们还要使用动词做别的事情

**为非资源型请求使用动词。在这种情况下，您的api并不需要返回任何资源。而是去执行一个操作并返回执行结果。这些不是 CRUD（创建，查询，更新和删除）操作**

```
/translate?text=Hallo
```

> 因为对于 CRUD，我们在资源或集合URL上使用 HTTP 自己带的方法。我们所说的动词实际上是指Controllers。您通常不会开发这些东西

**请求体或响应类型如果是JSON，那么请遵循camelCase规范为JSON属性命名来保持一致性**

> 这是一个 javascript 项目指南，其中用于生成JSON的编程语言以及用于解析JSON的编程语言被假定为 javascript

**如何使用HTTP方法来操作CRUD功能**

- `GET`: 查询资源的表示法
- `POST`: 创建一些新的资源或者子资源
- `PUT`: 更新一个存在的资源
- `PATCH`: 更新现有资源。它只更新所提供的字段，不管其他字段
- `DELETE`: 删除一个存在的资源

**对于嵌套资源，请在URL中把他们的关系表现出来。例如，使用id将员工与公司联系起来**

> 这是一种自然的方式，方便资源的认知

- `GET /schools/2/students` , 应该从学校2得到所有学生的名单
- `GET /schools/2/students/31` , 应该得到学生31的详细信息，且此学生属于学校2
- `DELETE /schools/2/students/31` , 应删除属于学校2的学生31
- `PUT /schools/2/students/31` , 应该更新学生31的信息，仅在资源URL上使用PUT方式，而不要用收集
- `POST /schools` , 应该创建一所新学校，并返回创建的新学校的细节。在集合`URL`上使用`POST`

**对于具有v前缀（v1，v2）的版本，使用简单的序数。并将其移到URL的左侧，使其具有最高的范围表述**

```js
http://api.domain.com/v1/schools/3/students    
```

> 当您的 api 为第三方公开时，升级api会导致发生一些意料之外的影响，也可能导致使用您api的人无法使用您的服务和产品。而这时使用URL中版本化可以防止这种情况的发生

**响应消息必须是自我描述的。一个很好的错误消息响应可能如下所示**

```js
{
    "code": 1234,
    "message" : "Something bad happened",
    "description" : "More details"
}
```

> 或验证错误:

```js
{
    "code" : 2314,
    "message" : "Validation Failed",
    "errors" : [
        {
            "code" : 1233,
            "field" : "email",
            "message" : "Invalid email"
        },
        {
            "code" : 1234,
            "field" : "password",
            "message" : "No password provided"
        }
      ]
}
```

- 开发人员在使用这些由api​​构建的应用程序时，难免会需要在故障排除和解决问题的关键时刻使用到这些精心设计的错误消息。好的错误消息设计能节约大量的问题排查时间
- _注意：尽可能保持安全异常消息的通用性。例如，别说不正确的密码，您可以换成无效的用户名或密码，以免我们不知不觉地通知用户他的用户名确实是正确的，只有密码不正确。这会让用户很懵逼。


**只使用这8个状态代码，并配合您自定义的响应描述来表述程序工作一切是否正常，客户端应用程序发生了什么错误或api发生错误**

- `200 OK GET`, PUT 或 POST 请求响应成功.
- `201 Created` 标识一个新实例创建成功。当创建一个新的实例，请使用POST方法并返回201状态码。
- `304 Not Modified` 发现资源已经缓存在本地，浏览器会自动减少请求次数。
- `400 Bad Request` 请求未被处理，因为服务器不能理解客户端是要什么。
- `401 Unauthorized` 因为请求缺少有效的凭据，应该使用所需的凭据重新发起请求。
- `403 Forbidden` 意味着服务器理解本次请求，但拒绝授权。
- `404 Not Found` 表示未找到请求的资源。
- `500 Internal Server Error` 表示请求本身是有效，但由于某些意外情况，服务器无法实现，服务器发生了故障

> 大多数 api 提供程序仅仅只使用一小部分 HTTP 状态代码而已。例如，Google GData api 仅使用了10个状态代码，Netflix 使用了9个，而 Digg 只使用了8个。当然，这些响应作为响应主体的附加信息。一共有超过 70 个 HTTP 状态代码。然而，大多数开发者不可能全部记住这 70 个状态码。因此，如果您选择不常用的状态代码，您将使应用程序开发人员厌烦构建应用程序，然后您还要跑到维基百科上面找出您要告诉他们的内容，多累啊

**在您的响应中提供资源的总数**

**接受limit和offset参数**

**还应考虑资源暴露的数据量。api消费者并不总是需要资源的完整表述。可以使用一个字段查询参数，该参数用逗号分隔的字段列表来包括**

```
GET /student?fields=id,name,age,class
```

**分页，过滤和排序功能并不需要从所有资源一开始就要得到支持。记录下那些提供过滤和排序的资源**

### 9.2 api 安全


> 这些是一些基本的安全最佳实践


**除非通过安全的连接（HTTPS），否则不要只使用基本认证。不要在URL中传输验证令牌：GET /users/123?token=asdf....**

> 因为令牌、用户ID和密码通过网络是明文传递的（它是base64编码，而base64是可逆编码），所以基本认证方案是不安全的

**必须使用授权请求头在每个请求上发送令牌：Authorization: Bearer xxxxxx, Extra yyyyy**

**授权代码应该是短暂的**

**通过不响应任何HTTP请求来拒绝任何非TLS请求，以避免任何不安全的数据交换。响应403 Forbidden的HTTP请求。**

**考虑使用速率限制**

> 保护您的api免受每小时数千次的机器人扫描威胁。您应该在早期就考虑实施流控

**适当地设置HTTP请求头可以帮助锁定和保护您的Web应用程序**

**您的api应将收到的数据转换为规范形式，或直接拒绝响应，并返回400错误请求（400 Bad Request）的错误，并在其中包含有关错误或丢失数据的详细信息**

**所有通过Rest api交换的数据必须由api来校验**

**序列化JSON**

> JSON编码器的一个关键问题是阻止任意的可执行代码在浏览器或在服务器中（如果您用nodejs的话）执行。您必须使用适当的JSON序列化程序对用户输入的数据进行正确编码，以防止在浏览器上执行用户提供的输入，这些输入可能会包含恶意代码，而不是正常的用户数据

**验证内容类型，主要使用application/*.json（Content-Type 头字段）**

> 例如，接受application/x-www-form-urlencodedMIME类型可以允许攻击者创建一个表单并触发一个简单的POST请求。服务器不应该假定Content-Type。缺少Content-Type请求头或异常的Content-Type请求头，应该让服务器直接以4XX响应内容去拒绝请求

### 9.3 api 文档

- 在README.md模板为 api 填写 api Reference 段落。
- 尽量使用示例代码来描述 api 授权方法
- 解释 URL 的结构（仅 path，不包括根 URL），包括请求类型（方法）

> 对于每个端点（endpoint）说明

**如果存在 URL 参数就使用 URL 参数，并根据URL中使用到的名称来指定它们**

```js
Required: id=[integer]
Optional: photo_id=[alphanumeric]
```

**如果请求类型为 POST，请提供如何使用的示例。上述的URL参数规则在这也可以适用。分为可选和必需**

**响应成功，应该对应什么样的状态代码，返回了哪些数据？当人们需要知道他们的回调应该是期望的样子，这很有用**

```js
Code: 200
Content: { id : 12 }
```

**错误响应，大多数端点都存在许多失败的可能。从未经授权的访问到错误参数等。所有的（错误描述信息）都应该列在这里。虽然有可能会重复，但它却有助于防止别人的猜想（，减少使用时的排错时间）。例如**

```js
{
    "code": 403,
    "message" : "Authentication failed",
    "description" : "Invalid username or password"
}   
```

**使用api​​设计工具，有很多开源工具可用于提供良好的文档**

## 10. 证书

> 确保您有权使用的这些资源。如果您使用其中的软件库，请记住先查询MIT，Apache或BSD（以更好地了解您所能够拥有的权限），但如果您打算修改它们，请查看许可证详细信息。图像和视频的版权可能会导致法律问题

