---
layout: post
title: "Porting PodcastUtilities to .NET Core"
date: 2019-04-26 12:00:00
published: true
tags: ["Development", "General", "PodcastUtilities", ".Net"]
categories: ["Development", "General", "PodcastUtilities", ".Net"]
---

We have built a new version (3.0.0.0) of PodcastUtilities this month. The [source code][code-url] and a cross platform [prebuild package][download-url] are available if you just want to run PodcastUtilities.

The new .NET Framework version is functionally the same as the previous version (2.2.2.0) all we have added is a new .NET Core / .NET Standard version

## Porting the code

It was relatively straightforward, well it was after I found Rick Strahl's [great article on porting][rick-url]. 

Its important to remember [the difference between .NET Standard and .NET Core][net-platform-url]. .NET Standard is a cross platform specification. .NET Core is an implementation of that standard for given environments, for example Windows, Linux, Mac etc. Assemblies (DLLs) can, and probably should target .NET Standard as then they can be consumed by any type of project. However executable targets, EXEs on Windows and DLLs on .NET Core must specify an actual runtime so that the required dependencies can be resolved.

As there is an implementation for .NET Core that runs on Windows so in theory we don't need to target .NET Framework at all, however we need .NET Framework for our implementation of MTP so we will continue to target this as well for the moment

There were some compromises in the product, and even more when it came to the tooling.

1. We could no longer support old versions of Visual Studio. PodcastUtilities used to be buildable using any version of Visual Studio from 2010 onwards, to be able to build for .NET Core we needed to move to a project structure only supported by Visual Studio 2017, and hopefully 2019
1. Common assembly information does not appear to be supported. We used to have all the common assembly information, such as copyright and version numbers in a common shared file however the new structure appears to want that information stored in each project file, however we may revisit this
1. .NET Core and .NET Standard have no support for perfmon counters
1. We used P/Invoke to access MTP devices, this is not possible in the cross platform solution so we cannot support MTP protocols in the .NET Core version, however we may be able to add this back later.
1. There is not common build process that can be used to build for .NET Framework 3.5 and .NET Core so we need to use two different processes and then another process to package the results.
1. Visual Studio can no longer run unit tests that target .NET Framework 3.5 from within the IDE. To run the tests we need to use the standalone NUnit v2 console or GUI runner

We ended up with a project structure that looked like this

{% highlight xml linenos %}
<Project Sdk="Microsoft.NET.Sdk">
 <PropertyGroup>
  <TargetFrameworks>net35;netstandard2.0</TargetFrameworks>
  <RootNamespace>PodcastUtilities.Common</RootNamespace>
  <AssemblyVersion>3.0.0.0</AssemblyVersion>
  <FileVersion>3.0.0.0</FileVersion>
  <Copyright>Copyright © Andrew Trevarrow and Derek Wilson 2008 - 2019</Copyright>
  <Product>PodcastUtilities</Product>
  <Company>AAD</Company>
  <Authors>Andrew Trevarrow and Derek Wilson</Authors>
  <Version>3.0.0</Version>
  <Description>Common utilities and API</Description>
  <AssemblyName>PodcastUtilities.Common</AssemblyName>
 </PropertyGroup>

 <!-- .NET Standard 2.0 references, compilation flags and build options -->
 <PropertyGroup Condition=" '$(TargetFramework)' == 'netstandard2.0'">
  <DefineConstants>NETSTANDARD;NETSTANDARD2_0</DefineConstants>
 </PropertyGroup>
 <ItemGroup Condition=" '$(TargetFramework)' == 'netstandard2.0'">
  <Compile Remove=".\Platform\FileSystemAwareDirectoryInfoProvider.cs" Label="NO_MTP" />
  <Compile Remove=".\Platform\FileSystemAwareDriveInfoProvider.cs" Label="NO_MTP" />
  <Compile Remove=".\Platform\FileSystemAwareFileInfoProvider.cs" Label="NO_MTP" />
  <Compile Remove=".\Platform\FileSystemAwareFileUtilities.cs" Label="NO_MTP" />
  <Compile Remove=".\Platform\FileSystemAwarePathUtilities.cs" Label="NO_MTP" />
  <Compile Remove=".\Platform\Mtp\**\*.cs" Label="NO_MTP" />
  <Compile Remove=".\Platform\IPerfmonCounterCreationDataProvider.cs" Label="NO_PERF" />
  <Compile Remove=".\Platform\IPerfmonCounterUtilities.cs" Label="NO_PERF" />
  <Compile Remove=".\Platform\SystemPerfmonCounter.cs" Label="NO_PERF" />
  <Compile Remove=".\Platform\SystemPerfmonCounterCreationDataProvider.cs" Label="NO_PERF" />
  <Compile Remove=".\Platform\SystemPerfmonCounterUtilities.cs" Label="NO_PERF" />
  <Compile Remove=".\Perfmon\AverageCounter.cs" Label="NO_PERF" />
  <Compile Remove=".\Perfmon\CategoryInstaller.cs" Label="NO_PERF" />
  <Compile Remove=".\Perfmon\ICategoryInstaller.cs" Label="NO_PERF" />
  <Compile Remove=".\Properties\AssemblyInfo.cs" Label="NO_ASSEMBLYINFO" />
 </ItemGroup>

 <!-- .NET references, compilation flags and build options -->
 <PropertyGroup Condition=" '$(TargetFramework)' == 'net35'">
  <DefineConstants>NET35;NETFULL</DefineConstants>
 </PropertyGroup>
 <ItemGroup Condition=" '$(TargetFramework)' == 'net35' ">		
  <Reference Include="System" />
  <Reference Include="System.Core" />
  <Reference Include="System.Xml" />
  <Reference Include="System.Xml.Linq" />
  <Reference Include="System.Data" />
  <Reference Include="System.Data.DataSetExtensions" />
  <ProjectReference Include="..\PodcastUtilities.PortableDevices\PodcastUtilities.PortableDevices.csproj">
   <Project>{A3FE8B09-71F1-4D97-8109-F946F90FEFB9}</Project>
   <Name>PodcastUtilities.PortableDevices</Name>
  </ProjectReference>
 </ItemGroup>
 <ItemGroup>
  <None Remove="XML\asxPlaylist.xml" />
  <None Remove="XML\state.xml" />
  <None Remove="XML\wplPlaylist.xml" />
 </ItemGroup>
 <ItemGroup>
  <EmbeddedResource Include="XML\asxPlaylist.xml" />
  <EmbeddedResource Include="XML\state.xml" />
  <EmbeddedResource Include="XML\wplPlaylist.xml" />
 </ItemGroup>
</Project>
{% endhighlight %}

As you can see the new Visual Studio 2017 project structure is much simpler.

The `PropertyGroup` element at the top has all the entries from the old `AssemblyInfo.cs` file. It also has the `TargetFrameworks` (note the plural), this means that we are targeting multiple platforms from this project. To work with this kind of project we need to edit the project XML file directly for some of the settings as Visual Studio GUI does not completely support multiple platform projects. It can build them just fine but not all the dialogs work properly.

Then we just have the `ItemGroup` for .NET Core and then for .NET Framework. 

The .NET Framework section is pretty much copied from the old project file, it has some assembly references and also a project reference to the assembly that does the P/Invoke for MPT support. 

The .NET Standard section just excludes the parts of the assembly that cannot work at the moment on .NET Standard as the supported calls are not there, perfmon and MTP. If this was an executable project rather than a DLL assembly then we would target .NET Core.

## Building the project

Now when we build the project in Visual Studio we see that the bin folder contains two folders `net35` contains the files needed for the .NET Framework and `netstandard2.0` contains the files for .NET Standard.

In the past we had one master build script that used MSBuild to make the targets and ZIP the build.

However when we run the MSBuild that comes with Visual Studio we get this

```
Using C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe
Microsoft (R) Build Engine version 4.7.3062.0
[Microsoft .NET Framework, version 4.0.30319.42000]
Copyright (C) Microsoft Corporation. All rights reserved.

Project "C:\Data\Code\PodcastUtilities\PodcastUtilities.Multiplatform.sln" (2) is building "C:\Data\Code\PodcastUtilities\PodcastUtilities.Common.Mul
tiplatform\PodcastUtilities.Common.Multiplatform.csproj.metaproj" (5) on node 1 (Clean target(s)).
C:\Data\Code\PodcastUtilities\PodcastUtilities.Common.Multiplatform\PodcastUtilities.Common.Multiplatform.csproj.metaproj : warning MSB4078: The proj
ect file "PodcastUtilities.Common.Multiplatform\PodcastUtilities.Common.Multiplatform.csproj" is not supported by MSBuild and cannot be built.
Done Building Project "C:\Data\Code\PodcastUtilities\PodcastUtilities.Common.Multiplatform\PodcastUtilities.Common.Multiplatform.csproj.metaproj" (Cl
ean target(s)).

Project "C:\Data\Code\PodcastUtilities\PodcastUtilities.Multiplatform.sln" (2) is building "C:\Data\Code\PodcastUtilities\PurgePodcasts.Multiplatform
\PurgePodcasts.Multiplatform.csproj" (6) on node 1 (Clean target(s)).
C:\Data\Code\PodcastUtilities\PurgePodcasts.Multiplatform\PurgePodcasts.Multiplatform.csproj(1,1): error MSB4041: The default XML namespace of the pr
oject must be the MSBuild XML namespace. If the project is authored in the MSBuild 2003 format, please add xmlns="http://schemas.microsoft.com/develo
per/msbuild/2003" to the <Project> element. If the project has been authored in the old 1.0 or 1.2 format, please convert it to MSBuild 2003 format.
Done Building Project "C:\Data\Code\PodcastUtilities\PurgePodcasts.Multiplatform\PurgePodcasts.Multiplatform.csproj" (Clean target(s)) -- FAILED.
```

The MSBuild cannot understand the new multiplatform project structure

If we try to use the .NET Core build system we get this

```
dotnet publish -c Release -f net35 .\PurgePodcasts.Multiplatform\PurgePodcasts.Multiplatform.csproj

Microsoft (R) Build Engine version 15.9.20+g88f5fadfbe for .NET Core
Copyright (C) Microsoft Corporation. All rights reserved.

  Restoring packages for C:\Data\Code\PodcastUtilities\PodcastUtilities.Ioc.Multiplatform\PodcastUtilities.Ioc.Multiplatform.csproj...
  Restoring packages for C:\Data\Code\PodcastUtilities\PodcastUtilities.Common.Multiplatform\PodcastUtilities.Common.Multiplatform.csproj...
  Restoring packages for C:\Data\Code\PodcastUtilities\PurgePodcasts.Multiplatform\PurgePodcasts.Multiplatform.csproj...
  Restore completed in 395.83 ms for C:\Data\Code\PodcastUtilities\PodcastUtilities.Common.Multiplatform\PodcastUtilities.Common.Multiplatform.csproj.

  Restore completed in 395.83 ms for C:\Data\Code\PodcastUtilities\PodcastUtilities.Ioc.Multiplatform\PodcastUtilities.Ioc.Multiplatform.csproj.
  Restore completed in 386.37 ms for C:\Data\Code\PodcastUtilities\PurgePodcasts.Multiplatform\PurgePodcasts.Multiplatform.csproj.
C:\Program Files\dotnet\sdk\2.1.502\Microsoft.Common.CurrentVersion.targets(1179,5): error MSB3644: The reference assemblies for framework ".NETFramew
ork,Version=v3.5" were not found. To resolve this, install the SDK or Targeting Pack for this framework version or retarget your application to a vers
ion of the framework for which you have the SDK or Targeting Pack installed. Note that assemblies will be resolved from the Global Assembly Cache (GAC
) and will be used in place of reference assemblies. Therefore your assembly may not be correctly targeted for the framework you intend. [C:\Data\Code
\PodcastUtilities\PurgePodcasts.Multiplatform\PurgePodcasts.Multiplatform.csproj]
```

It sort of understands what we are trying to do but .NET Framework v3.5 does not appear to be supported and it does not look like Microsoft are going to be releasing a .NET Framework v3.5 targeting pack any time soon

Working with debug builds in Visual Studio works just fine for running and debugging however unfortunately the master build process cannot build for both platforms. 

Instead we must

1. Build all the .NET Framework assemblies - in VS 2017 select Build -> Batch Build and select all the Release targets and rebuild
1. Build all the .NET Core assemblies - from the command line run `PublishAll.bat` from the root of the project
1. Package the ZIP - from the command line run `BuildAll.cmd` (after installing the community tasks)

## Running the tests

When we tried to run the tests from within Visual Studio we got this error

```
[30/01/2019 18:23:42 Informational] ------ Discover test started ------
[30/01/2019 18:23:48 Error] Microsoft.VisualStudio.TestPlatform.ObjectModel.TestPlatformException: Framework35 is not supported. For projects targeting .Net Framework 3.5, please use Framework40 to run tests in CLR 4.0 "compatibility mode".
   at Microsoft.VisualStudio.TestPlatform.CommandLine.TestPlatformHelpers.TestRequestManager.UpdateRunSettingsIfRequired(String runsettingsXml, List`1 sources, String& updatedRunSettingsXml)
   at Microsoft.VisualStudio.TestPlatform.CommandLine.TestPlatformHelpers.TestRequestManager.DiscoverTests(DiscoveryRequestPayload discoveryPayload, ITestDiscoveryEventsRegistrar discoveryEventsRegistrar, ProtocolConfig protocolConfig)
   at Microsoft.VisualStudio.TestPlatform.Client.DesignMode.DesignModeClient.<>c__DisplayClass20_0.<StartDiscovery>b__0()
[30/01/2019 18:23:51 Informational] NUnit VS Adapter 2.1.1.0 discovering tests is started
[30/01/2019 18:23:52 Informational] NUnit VS Adapter 2.1.1.0 discovering test is finished
[30/01/2019 18:23:52 Warning] No test is available in C:\Data\Code\PodcastUtilities\PodcastUtilities.Common.Multiplatform\bin\Debug\netstandard2.0\PodcastUtilities.Common.dll C:\Data\Code\PodcastUtilities\PodcastUtilities.Ioc.Multiplatform\bin\Debug\netstandard2.0\PodcastUtilities.Ioc.dll. Make sure that test discoverer & executors are registered and platform & framework version settings are appropriate and try again.
[30/01/2019 18:23:52 Informational] ========== Discover test finished: 0 found (0:00:10.0735762) ==========
[30/01/2019 18:23:52 Informational] ------ Run test started ------
[30/01/2019 18:23:52 Error] Microsoft.VisualStudio.TestPlatform.ObjectModel.TestPlatformException: Framework35 is not supported. For projects targeting .Net Framework 3.5, please use Framework40 to run tests in CLR 4.0 "compatibility mode".
   at Microsoft.VisualStudio.TestPlatform.CommandLine.TestPlatformHelpers.TestRequestManager.UpdateRunSettingsIfRequired(String runsettingsXml, List`1 sources, String& updatedRunSettingsXml)
   at Microsoft.VisualStudio.TestPlatform.CommandLine.TestPlatformHelpers.TestRequestManager.RunTests(TestRunRequestPayload testRunRequestPayload, ITestHostLauncher testHostLauncher, ITestRunEventsRegistrar testRunEventsRegistrar, ProtocolConfig protocolConfig)
   at Microsoft.VisualStudio.TestPlatform.Client.DesignMode.DesignModeClient.<>c__DisplayClass19_0.<StartTestRun>b__0()
[30/01/2019 18:23:53 Informational] ========== Run test finished: 0 run (0:00:00.7240414) ==========
```

The message `Framework35 is not supported.` is pretty clear and indeed although .NET Framework v3.5 will be supported for another decade that does not include tooling support apparently

We did experiment with trying to run the tests in .NET Framework v4.5 and they did work, after we had found this error

```
Message: SetUp : System.TypeLoadException : Could not load type 'IPortableDeviceProxy4544da1dcbf34c84863d05e291b68160' from assembly 'DynamicProxyGenAssembly2, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null'. The type is marked as eligible for type equivalence, but either it has generic parameters, or it is not a structure, COM imported interface, enumeration, or delegate.
```

This was because Rhino mocks is not longer being supported and does not really like .NET Framework v4. However there is a [fix][rhino-fix-url] that enabled the tests to run just fine, we just did this in the base test

{% highlight c# linenos %}
protected override void GivenThat()
{
  base.GivenThat();
  // .NET4 doesnt work properly with Rhino
  // https://stackoverflow.com/questions/3444581/mocking-com-interfaces-using-rhino-mocks
  Castle.DynamicProxy.Generators.AttributesToAvoidReplicating.Add(typeof(TypeIdentifierAttribute));
{% endhighlight %}

However in the end we decided to remain targeting .NET Framework v3.5 for the tests as that is the framework we target for the main project and we will use the standalone NUnit GUI and console runners. We also updated the coverage scripts to use the newest version of [Open Cover][opencover-url] and the [Report Generator][reportgen-url]


[download-url]:		https://github.com/derekwilson/PodcastUtilities/tree/master/_PreBuiltPackages
[code-url]:				https://github.com/derekwilson/PodcastUtilities
[rick-url]:          https://weblog.west-wind.com/posts/2017/Jun/22/MultiTargeting-and-Porting-a-NET-Library-to-NET-Core-20
[net-platform-url]:  https://msdn.microsoft.com/en-us/magazine/mt842506.aspx
[rhino-fix-url]:     https://stackoverflow.com/questions/3444581/mocking-com-interfaces-using-rhino-mocks
[opencover-url]:     https://github.com/opencover/opencover/releases
[reportgen-url]:     https://github.com/danielpalme/ReportGenerator/releases

