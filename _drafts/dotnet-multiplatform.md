
### MSBuild .NET

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

### dotnet build

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


### Tests

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

However

Message: SetUp : System.TypeLoadException : Could not load type 'IPortableDeviceProxy4544da1dcbf34c84863d05e291b68160' from assembly 'DynamicProxyGenAssembly2, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null'. The type is marked as eligible for type equivalence, but either it has generic parameters, or it is not a structure, COM imported interface, enumeration, or delegate.


https://stackoverflow.com/questions/3444581/mocking-com-interfaces-using-rhino-mocks


