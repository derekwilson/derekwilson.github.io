---
layout: post
title:  "Xamarin Android Part 5"
date:   2022-06-30 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Xamarin Android for Android Developers

In the [previous post][part-4-url] we got as far as building an app for Android using [Xamarin Android][xamarin-android-url]. The app was build using the current Android architecture, targetting Android 12, using viewmodels, dependency injection and observers. We also built and ran unit tests to exercise the code. Now all that is needed it to publish the app.

### Odds and Ends

Up until now we have just been building and using the `Debug` configuration. If we want to publish the app we need to make sure that the `Release` configuration is setup correctly.

#### Signing

All APKs [must be signed][apk-signing-url]. The `Debug` build is signed using the key in the Android SDK however for the release build I needed to generate my own key. This key needs to be kept safe and not checked into a public repo.

To do this I created a folder called `LocalOnly` to contain all the files relating to signing. This folder is excluded from git. It contains two key files `myapp.keystore` and `keystoreproperties.xml`. The actual signing key is `myapp.keystore` and I generated it using this command

```
keytool -genkey -v -keystore myapp.keystore -alias myapp -keyalg RSA -keysize 2048 -validity 36500 -dname "cn=MyName"
```

You will be prompted for a password for the key. You can list the keys in the keystore, which good for testing the password, with this command

```
keytool -list -v -keystore myapp.keystore
```

To get the build tools to use this key I added these lines to the main app `csproj`. After the initial `PropertyGroup` elements, and before the `ItemGroup`

{% highlight xml linenos %}
</PropertyGroup>
<Import Project="$(ProjectDir)..\LocalOnly\keystoreproperties.xml" Condition=" '$(Configuration)|$(Platform)' == 'Release|AnyCPU' " />
<ItemGroup>
{% endhighlight %}

This line will only import the `keystoreproperties.xml` into the `csproj` file for the release build. The `keystoreproperties.xml` file looks like this

{% highlight xml linenos %}
<Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|AnyCPU' ">
    <AndroidKeyStore>True</AndroidKeyStore>
    <AndroidSigningKeyStore>$(ProjectDir)..\LocalOnly\myapp.keystore</AndroidSigningKeyStore>
    <AndroidSigningStorePass>your-super-secret-password</AndroidSigningStorePass>
    <AndroidSigningKeyAlias>myapp</AndroidSigningKeyAlias>
    <AndroidSigningKeyPass>your-super-secret-password</AndroidSigningKeyPass>
  </PropertyGroup>
</Project>{% endhighlight %}

If you get the code from git, then you can build the `Debug` configuration but you will get an error if you try and build the `Release` configuration unless you have the `LocalOnly` folder.

#### Package names

As we saw in [part 2][part-2-url] I created a script to append .debug to the package name for the `Debug` build and to remove it for the `Release` build, however we still need to decide on the base package name. 

The deployment mechanisms (Sideload or GooglePlay) are not interchangeable as different signing keys are used for each mechanism. For GooglePlay Google will re-sign the AAB as it is downloaded and for Sideload the signing key is in `LocalOnly`. For that reason users cannot install using different mechanisms even if the package names are the same (in fact this requires them to uninstall and reinstall rather than upgrade).

To keep this manageable I used different package names for each mechanism.

| Deployment Mechanism | Configuration | Packagename |
| -------------------- | ------------- | ----------- |
| GooglePlay           | Release       | com.example.myapp
| GooglePlay           | Debug         | com.example.myapp.debug
| Sideload             | Release       | com.example.myapp.sideload
| Sideload             | Debug         | com.example.myapp.sideload.debug 

The package name is also the folder name below `sdcard/Android/data` where the logs and cached files are stored.

#### Logging

In [part 3][part-3-url] I setup the logging for the app using [NLog][nlog-url]. For the `Debug` build this worked fine but for the release we dont want to fill up the users phone with log files. T do this I modified the logger factory like this.

{% highlight C# linenos %}
public interface ILoggerFactory
{
  ILogger Logger { get; }
}

public class NLoggerLoggerFactory : ILoggerFactory
{
  /// <summary>
  /// Use whatever is in the config file
  /// </summary>
  public NLoggerLoggerFactory()
  {
  }

  /// <summary>
  /// setup the file target with the supplied folder
  /// </summary>
  /// <param name="folder">folder for log files</param>
  public NLoggerLoggerFactory(String folder)
  {
    var config = LogManager.Configuration;
    var target = config.FindTargetByName("externalFileTarget");
    var fileTarget = target as FileTarget;
    fileTarget.FileName = Path.Combine(folder, "logs/${shortdate}.log.csv");
    fileTarget.ArchiveFileName = Path.Combine(folder, "logs/archive.{#}.log.csv");
    // set the loglevel
#if DEBUG
    SetLoggingLevel(LogLevel.Debug);
#else
    SetLoggingLevel(LogLevel.Error);
#endif
    // re-apply the config
    LogManager.ReconfigExistingLoggers();
  }

  private void SetLoggingLevel(LogLevel minLevel)
  {
    if (minLevel == LogLevel.Off)
    {
      LogManager.DisableLogging();
      return;
    }

    if (!LogManager.IsLoggingEnabled())
    {
      LogManager.EnableLogging();
    }
    foreach (var rule in LogManager.Configuration.LoggingRules)
    {
      rule.SetLoggingLevels(minLevel, LogLevel.Fatal);
    }
  }

  public ILogger Logger
  {
    get
    {
      var logger = LogManager.GetCurrentClassLogger();
      return new NLogLogger(logger);
    }
  }
}
{% endhighlight %}

This change means that we log everything in the `Debug` configuration but only the errors in the `Release` configuration.

### Publishing

Building the release for publishing is slightly different depending on if its an AAB or an APK.

#### Publishing an AAB

Google play insists that all new apps be published as an AAB. The command to build the release looks like this

```
msbuild MyApp.csproj /p:Configuration=Release /t:Clean;SignAndroidPackage /p:AndroidPackageFormat=aab
```

The AAB is then produced in this folder `bin\Release\`. Using an AAB is a little fiddly as they cannot be directly installed on a device, we must first generate a universal APK using this command sequence.

```
del myapp.apks
del myapp.apks.zip
del universal.apk
del toc.pb
java -jar bundletool-all-1.9.1.jar build-apks --bundle=com.example.myapp-Signed.aab --output=myapp.apks --mode=universal
ren myapp.apks myapp.apks.zip
PowerShell -ExecutionPolicy Unrestricted -command "Expand-Archive myapp.apks.zip ."
```

You will need to [download a bundletool release][bundletool-url] to use the script. Then test install the generated APK like this

```
adb install -r universal.apk
```

If all looks good the AAB can be uploaded to the Google Play store.

#### Publishing an APK

The advantage of building an APK is that it can be sideloaded by any phone. The command to build it looks like this

```
msbuild MyApp.csproj /p:Configuration=Release /t:Clean;SignAndroidPackage /p:AndroidPackageFormat=apk
```

The APK is then produced in this folder `bin\Release\`. This can either just be copied or downloaded onto the phone and installed or can be installed using this command

```
adb install -r com.example.myapp.sideload-Signed.apk
```


[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[part-3-url]:               /blog/2022/03/27/xamarin-android-part3
[part-4-url]:				/blog/2022/04/27/xamarin-android-part4
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[livedata-url]:             https://developer.android.com/topic/libraries/architecture/livedata
[events-url]:               https://docs.microsoft.com/en-us/dotnet/standard/events/
[unit-test1-url]:           https://developer.android.com/training/testing/fundamentals
[unit-test2-url]:           https://developer.android.com/training/testing/local-tests
[robolectric-url]:          http://robolectric.org
[wsa-url]:                  https://docs.microsoft.com/en-us/windows/android/wsa/
[xunit-devices-url]:        https://github.com/xunit/devices.xunit
[nunit-lite-url]:           https://github.com/xamarin/Xamarin.Legacy.NUnitLite
[nunit-template-url]:       https://dgatto.com/posts/2020/12/droid-nunit-template/
[fakeiteasy-url]:           https://fakeiteasy.readthedocs.io/en/stable/
[apk-signing-url]:			https://developer.android.com/studio/publish/app-signing
[nlog-url]:                 https://nlog-project.org
[bundletool-url]:			https://github.com/google/bundletool/releases
