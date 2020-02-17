导语：
9月11日，在上海举办的谷歌开发者大会“Google Developer Days“，谷歌Flutter团队宣布正式推出Flutter 1.9稳定版，这是 Flutter 迄今为止最大的一次版本更新，100 余位贡献者提交共计超过1500份pull request。团队还在会上宣布了另一个具有里程碑意义的重磅消息: Flutter web 支持现已成功合并到 Flutter 的主 repo，自此以后，开发者只需使用同一套基准代码，便可为移动平台、桌面端和网页端开发应用。

那么跨平台、高性能的Flutter是否将一统江湖？

不管如何，Flutter入门第一步——搭建开发环境，史上最详细保姆级教程来了。


图片来源于网络



Flutter开发环境的搭建比较烦琐，任何一个步骤失败都会导致最终环境搭建不能完成。Flutter支持三种环境：Windows、MacOS和Linux。这里我们主要讲解Windows及MacOS的环境搭建。

Windows环境搭建

1.使用镜像

首先解决网络问题。环境搭建过程中需要下载很多资源文件，当某个资源未及时更新时，就可能报各种错误。在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像，可以将如下环境变量加入用户环境变量中：
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

注意：以上镜像为临时镜像，并不能保证一直可用，读者可以参考Using Flutter in China（网址为https://github.com/flutter/flutter/wiki/Using-Flutter-in-China）以获得有关镜像服务器的最新动态。

2.安装Git

Flutter依赖的命令行工具为Git for Windows（Git命令行工具）。Windows版本的下载地址为https://git-scm.com/download/win。

3.下载安装Flutter SDK

在Flutter官网下载最新可用的安装包。

注意：Flutter的渠道版本会不停变动，请以Flutter官网为准。另外，在中国大陆地区，要想获取安装包列表或下载安装包有可能发生困难，读者也可以去Flutter GitHub项目下去下载安装Release包。
Flutter官网下载地址：https://flutter.io/docs/development/tools/sdk/archive#windows。
Flutter GitHub下载地址：https://github.com/flutter/flutter/releases。

将安装包解压到想安装Flutter SDK的路径（如D:\Flutter）。在Flutter安装目录的Flutter文件下找到flutter_console.bat，双击运行该文件并启动Flutter命令行，接下来就可以在Flutter命令行运行flutter命令了。
不要将Flutter安装到需要一些高权限的路径，如C:\Program Files\。

4.添加环境变量

不管使用什么工具，如果想在系统的任意地方能够运行这个工具的命令，则需要添加工具的路径到系统路径中。这里路径指向Flutter文件的bin路径，如图1-5所示。同时，要检查是否有名为“PUB_HOSTED_URL”和“FLUTTER_STORAGE_BASE_URL”的条目，如果没有，也需要添加这两个条目。重启Windows才能使更改生效。

图1-5　添加Flutter环境变量

5.运行flutter命令安装各种依赖

使用Windows命令窗口运行以下命令，查看是否需要安装依赖项来完成安装：
flutter doctor

该命令检查你的环境并在终端窗口中显示报告。Dart SDK已经捆绑在Flutter里了，没有必要单独安装Dart。仔细检查命令行输出以获取可能需要安装的其他软件或进一步需要执行的任务。如下代码粗体部分显示，Android SDK缺少命令行工具，需要下载并且提供了下载地址，通常这种情况只需要连接网络，打开VPN，然后重新运行flutter doctor命令即可。
[-] Android toolchain - develop for Android devices
    Android SDK at D:\Android\sdk
  ?Android SDK is missing command line tools; download from https://goo.gl/XxQghQ
  Try re-installing or updating your Android SDK,
    visit https://flutter.io/setup/#android-setup for detailed instructions.

注意：一旦安装了任何缺失的依赖，需要再次运行flutter doctor命令来验证是否已经正确地设置了，同时需要检查移动设备是否连接正常。

6.编辑器设置

如果使用Flutter命令行工具，可以使用任何编辑器来开发Flutter应用程序。输入flutter help命令，在提示符下查看可用的工具。但是笔者建议最好安装一款功能强大的IDE来进行开发，这样开发效率会更高。由于Windows环境只能开发Flutter的Android应用，所以接下来我们会重点介绍Android Studio这款IDE。

（1）安装Android Studio
要为Android开发Flutter应用，可以使用Mac或Windows操作系统。Flutter需要安装和配置Android Studio，步骤如下：
1）下载并安装Android Studio：https://developer.android.com/studio/index.html。
2）启动Android Studio，然后执行“Android Studio安装向导”，将安装最新的Android 
SDK、Android SDK平台工具和Android SDK构建工具，这是为Android开发Flutter应用时所必需的。

（2）设置你的Android设备
要准备在Android设备上运行并测试你的Flutter应用，需要安装Android 4.1（API level 16）或更高版本的Android设备。步骤如下：

1）在你的设备上启用“开发人员选项”和“USB调试”，这些选项通常在设备的“设置”界面里。
2）使用USB线将手机与计算机连接。如果你的设备出现提示，请授权计算机访问你的设备。
3）在终端中，运行flutter devices命令以验证Flutter识别出你连接的Android设备。
4）用flutter run命令启动你的应用程序。

注意：默认情况下，Flutter使用的Android SDK版本基于你的adb工具版本。如果想让Flutter使用不同版本的Android SDK，则必须将该ANDROID_HOME环境变量设置为SDK安装目录。

（3）设置Android模拟器
要准备在Android模拟器上运行并测试Flutter应用，请按照以下步骤操作：
1）启动Android Studio→Tools→Android→AVD Manager并选择Create Virtual Device，
打开虚拟设备面板，如图1-6所示。

图1-6　打开虚拟设备面板

2）选择一个设备并点击Next按钮，如图1-7所示。

图1-7　选择模拟硬件设备

3）选择一个镜像，点击Download即可，然后点击Next按钮，如图1-8所示。

图1-8　选择系统镜像

4） 验证配置信息，填写虚拟设备名称，选择Hardware-GLES 2.0以启用硬件加速，点击Finish按钮，如图1-9所示。

图1-9　验证配置信息

5）在工具栏选择刚刚添加的模拟器，如图1-10所示。

图1-10　在工具栏选择模拟器

6）也可以在命令行窗口运行flutter run命令启动模拟器。当能正常显示模拟器时（如图1-11所示），则表示模拟器安装正常。

注意：建议选择当前主流手机型号作为模拟器，开启硬件加速，使用x86或x86_64 image。
详细文档请参考https://developer.android.com/studio/run/emulator-acceleration.html。

（4）安装Flutter和Dart插件

IDE需要安装两个插件：
Flutter插件：支持Flutter开发工作流（运行、调试、热重载等）。
Dart插件：提供代码分析（输入代码时进行验证、代码补全等）。

图1-11　Android模拟器运行效果图

打开Android Studio的系统设置面板，找到Plugins并分别搜索Flutter和Dart，点击安装即可，如图1-12所示。

图1-12　Android Studio插件安装


MacOS环境搭建

首先解决网络问题，可参见第一节。

命令行工具

Flutter依赖的命令行工具有bash、mkdir、rm、git、curl、unzip、which。

下载并安装Flutter SDK

请按以下步骤下载并安装Flutter SDK：
步骤1　在Flutter官网下载其最新可用的安装包。
步骤2　解压安装包到想安装的目录，例如：

cd /Users/ksj/Desktop/flutter/
unzip /Users/ksj/Desktop/flutter/v0.11.9.zip.zip

步骤3　添加Flutter相关工具到path中：

export PATH=`pwd`/flutter/bin:$PATH

运行Flutter命令安装各种依赖

运行以下命令查看是否需要安装其他依赖项：
flutter doctor

该命令检查你的环境并在终端窗口中显示报告。Dart SDK已经捆绑在Flutter里了，没有必要单独安装Dart。仔细检查命令行输出，这里可能需要安装其他软件或进一步需要执行的任务（以粗体显示）。如下代码中粗体部分所示，Android SDK缺少命令行工具，需要下载并且提供了下载地址，通常出现这种情况时，只需要连接好网络，打开VPN，然后重新运行flutter doctor命令即可。

[-] Android toolchain - develop for Android devices
    Android SDK at /Users/obiwan/Library/Android/sdk
  ?Android SDK is missing command line tools; download from https://goo.gl/XxQghQ
  Try re-installing or updating your Android SDK,
visit https://flutter.io/setup/#android-setup for detailed instructions.

添加环境变量

使用vim命令打开~/.bash_profile文件，添加如下内容：

export ANDROID_HOME=~/Library/Android/sdk                    // android sdk目录
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export PUB_HOSTED_URL=https://pub.flutter-io.cn               // 国内用户需要设置
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn // 国内用户需要设置
export PATH=/Users/ksj/Desktop/flutter/flutter/bin:$PATH // 直接指定flutter的bin地址

注意：请将PATH=/Users/ksj/Desktop/flutter/flutter/bin更改为你的路径。

完整的环境变量设置如图1-13所示。
设置好环境变量以后，务必运行source $HOME/.bash_profile命令刷新当前终端窗口，以使刚刚配置的内容生效。

图1-13　MacOS环境变量设置

编辑器设置

MacOS环境既能开发Android应用，也能开发iOS应用，Android设置请参考1.2.1节中的“安装Android Studio”部分。Xcode可用于开发iOS应用，接下来我们介绍Xcode的使用方法。
（1）安装Xcode
安装最新版本的Xcode。可通过链接下载（https://developer.apple.com/xcode/），或通过苹果应用商店下载（https://itunes.apple.com/us/app/xcode/id497799835）。

（2）设置iOS模拟器
要准备在iOS模拟器上运行并测试你的Flutter应用。要打开一个模拟器，在MacOS的终端输入以下命令：
open -a Simulator
该命令可以找到并打开默认模拟器。如果想切换模拟器，可以选择Hardware → Device，
再选择一个模拟器，如图1-14所示。
打开后的模拟器如图1-15所示。
接下来，在终端运行flutter run命令或者打开Xcode，按图1-16所示选择好模拟器。点击运行按钮即可启动应用。

（3）安装到iOS设备
要在苹果真机上测试Flutter应用，需要有一个苹果开发者账户，还需要在Xcode中进行设置。

图1-14　选择iOS模拟器

图1-15　iOS模拟器效果图　　　　　　　　　　图1-16　Xcode启动应用

1）安装Homebrew工具。Homebrew是一款MacOS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能，下载地址为https://brew.sh。
2）打开终端并运行一些命令，安装工具，用于将Flutter应用安装到iOS设备上，命令如下所示：

brew update
brew install --HEAD libimobiledevice
brew install ideviceinstaller ios-deploy cocoapods
pod setup

注意：如果这些命令中有任何一个失败并出现错误，请运行brew doctor命令并按照说明解决问题。

接下来需要设置Xcode签名，步骤如下：

步骤1　在Flutter项目目录中通过双击ios/Runner.xcworkspace打开默认的Xcode
工程。
步骤2　在Xcode中，选择导航左侧面板中的Runner项目。
步骤3　在Runner target设置页面中，确保在General→Signing→Team（常规→签名→团队）下选择了你的开发团队，如图1-17所示。当你选择一个团队时，Xcode会创建并下载开发证书，为你的设备注册账户，并创建和下载配置文件。

图1-17　设置开发团队

步骤4　如果你要开始第一个iOS开发项目，可能需要使用你的Apple ID登录Xcode。任何Apple ID都支持开发和测试。需要注册Apple开发者计划才能将你的应用分发到App Store。请查看https://developer.apple.com/support/compare-memberships/这篇文章。登录界面如图1-18所示。
步骤5　当你第一次添加真机设备进行iOS开发时，需要设置同时信任你的Mac和该设备上的开发证书。点击Trust按钮即可，如图1-19所示。

图1-18　使用Apple ID　　　　　　　　　               图1-19　信任此计算机图示

步骤6　如果Xcode中的自动签名失败，请查看项目的Bundle Identifier值是否唯一。这个ID即为应用的唯一ID，建议使用域名反过来写，如图1-20所示。
步骤7　使用flutter run命令运行应用程序。

图1-20　验证Bundle Identifier值


　写第一个Flutter程序

万事开头难，让我们开始写第一个简单的Flutter程序，具体步骤如下。

步骤1　新建一个Flutter工程，选择Flutter Application，如图1-21所示。

图1-21　新建工程

步骤2　点击Next按钮，打开应用配置界面，在Project name中填写helloworld，Flutter SDK path使用默认值，IDE会根据SDK安装路径自动填写，Project location填写为工程放置的目录，在Description中填写项目描述，任意字符即可，如图1-22所示。

图1-22　配置Flutter工程

步骤3　点击Next按钮，打开包设置界面，在Company domain中填写域名，注意域名要反过来写，这样可以保证全球唯一，Platform channel language下面的两个选项不需要选中，如图1-23所示。

图1-23　设置包名界面

步骤4　点击Finish按钮开始创建第一个工程，等待几分钟，会创建如图1-24所示的工程。

步骤5　工程创建好后，可以先运行一下官方创建的示例，看一看运行效果，点击Open iOS Simulator打开iOS模拟器，具体操作如图1-25所示。

图1-24　示例工程主界面

图1-25　打开模拟器菜单示意图

步骤6　等待几秒钟后会打开模拟器，如图1-26所示。

步骤7　点击debug（调试）按钮，启动官方示例程序，点击+按钮，可以自动加1，此示例是一个基于Material Design风格的应用程序，如图1-27所示。

图1-26　模拟器启动完成图

图1-27　官方示例运行效果图
步骤8　接下来我们打开工程目录下的main.dart文件，清空main.dart代码，如图1-28箭头所指。

图1-28　打开main.dart文件

步骤9　把Hello World代码粘贴至main.dart文件，完整代码如下所示：
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}

步骤10　重新运行此程序，标题栏显示Welcome to Flutter，页面中间显示Hello World。这样，第一个Flutter程序就运行出来啦，如图1-29所示。

图1-29　Hello World运行效果图
