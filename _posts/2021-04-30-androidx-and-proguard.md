---
layout: post
title:  "AndroidX Navigation and Proguard"
date:   2021-04-30 12:00:00
published: true
tags: ["Android", "Development"]
categories: ["Android", "Development"]
---

Recently I can across an odd problem with [AndroidX navigation][androidx-navigation-url] and [Proguard][proguard-url]. It was odd because the code worked fine in a debug build but the release variant crashed. There is very little difference between the debug and release variants, as you would expect, the main one is proguard. I am not a big fan of proguard, for this exact reason, however it was a requirement from the client.


 with the following error

```
E/AndroidRuntime: FATAL EXCEPTION: main
    Process: myapp, PID: 21212
    java.lang.RuntimeException: Unable to start activity ComponentInfo{myapp/mydomain.HostActivity}: java.lang.RuntimeException: Exception inflating myapp:navigation/nav_graph line 14
        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2913)
        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3048)
        at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78)
        at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108)
        at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68)
        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1808)
        at android.os.Handler.dispatchMessage(Handler.java:106)
        at android.os.Looper.loop(Looper.java:193)
        at android.app.ActivityThread.main(ActivityThread.java:6669)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:858)
     Caused by: java.lang.RuntimeException: Exception inflating myapp:navigation/nav_graph line 14
        at androidx.navigation.NavInflater.inflate(SourceFile:14)
        at androidx.navigation.NavController.setGraph(SourceFile:2)
        at mydomain.HostActivity.onCreate(SourceFile:5)
        at android.app.Activity.performCreate(Activity.java:7136)
        at android.app.Activity.performCreate(Activity.java:7127)
        at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1271)
        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2893)
        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3048) 
        at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78) 
        at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108) 
        at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68) 
        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1808) 
        at android.os.Handler.dispatchMessage(Handler.java:106) 
        at android.os.Looper.loop(Looper.java:193) 
        at android.app.ActivityThread.main(ActivityThread.java:6669) 
        at java.lang.reflect.Method.invoke(Native Method) 
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493) 
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:858) 
     Caused by: java.lang.RuntimeException: java.lang.ClassNotFoundException: mydomain.models.ControlDTO
        at androidx.navigation.NavType.fromArgType(SourceFile:30)
        at androidx.navigation.NavInflater.inflateArgument(SourceFile:7)
        at androidx.navigation.NavInflater.inflateArgumentForDestination(SourceFile:3)
        at androidx.navigation.NavInflater.inflate(SourceFile:25)
        at androidx.navigation.NavInflater.inflate(SourceFile:36)
        at androidx.navigation.NavInflater.inflate(SourceFile:6)
        at androidx.navigation.NavController.setGraph(SourceFile:2) 
        at mydomain.HostActivity.onCreate(SourceFile:5) 
        at android.app.Activity.performCreate(Activity.java:7136) 
        at android.app.Activity.performCreate(Activity.java:7127) 
        at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1271) 
        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2893) 
        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3048) 
        at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78) 
        at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108) 
        at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68) 
        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1808) 
        at android.os.Handler.dispatchMessage(Handler.java:106) 
        at android.os.Looper.loop(Looper.java:193) 
        at android.app.ActivityThread.main(ActivityThread.java:6669) 
        at java.lang.reflect.Method.invoke(Native Method) 
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493) 
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:858) 
     Caused by: java.lang.ClassNotFoundException: mydomain.models.ControlDTO
        at java.lang.Class.classForName(Native Method)
        at java.lang.Class.forName(Class.java:453)
        at java.lang.Class.forName(Class.java:378)
        at androidx.navigation.NavType.fromArgType(SourceFile:22)
        at androidx.navigation.NavInflater.inflateArgument(SourceFile:7) 
        at androidx.navigation.NavInflater.inflateArgumentForDestination(SourceFile:3) 
        at androidx.navigation.NavInflater.inflate(SourceFile:25) 
        at androidx.navigation.NavInflater.inflate(SourceFile:36) 
        at androidx.navigation.NavInflater.inflate(SourceFile:6) 
        at androidx.navigation.NavController.setGraph(SourceFile:2) 
        at mydomain.HostActivity.onCreate(SourceFile:5) 
        at android.app.Activity.performCreate(Activity.java:7136) 
        at android.app.Activity.performCreate(Activity.java:7127) 
        at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1271) 
        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2893) 
        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3048) 
        at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78) 
        at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108) 
        at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68) 
        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1808) 
        at android.os.Handler.dispatchMessage(Handler.java:106) 
        at android.os.Looper.loop(Looper.java:193) 
        at android.app.ActivityThread.main(ActivityThread.java:6669) 
        at java.lang.reflect.Method.invoke(Native Method) 
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493) 
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:858) 
     Caused by: java.lang.ClassNotFoundException: Didn't find class "mydomain.models.ControlDTO" on path: DexPathList[[zip file "/system/framework/org.apache.http.legacy.boot.jar", zip file "/data/app/myapp.debug-4feQETSdKRijsMAIofJKRQ==/base.apk"],nativeLibraryDirectories=[/data/app/myapp.debug-4feQETSdKRijsMAIofJKRQ==/lib/x86, /system/lib]]
        at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:134)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:379)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:312)
        at java.lang.Class.classForName(Native Method) 
        at java.lang.Class.forName(Class.java:453) 
        at java.lang.Class.forName(Class.java:378) 
        at androidx.navigation.NavType.fromArgType(SourceFile:22) 
        at androidx.navigation.NavInflater.inflateArgument(SourceFile:7) 
        at androidx.navigation.NavInflater.inflateArgumentForDestination(SourceFile:3) 
        at androidx.navigation.NavInflater.inflate(SourceFile:25) 
        at androidx.navigation.NavInflater.inflate(SourceFile:36) 
        at androidx.navigation.NavInflater.inflate(SourceFile:6) 
        at androidx.navigation.NavController.setGraph(SourceFile:2) 
        at mydomain.HostActivity.onCreate(SourceFile:5) 
        at android.app.Activity.performCreate(Activity.java:7136) 
        at android.app.Activity.performCreate(Activity.java:7127) 
        at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1271) 
        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2893) 
        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3048) 
        at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78) 
        at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108) 
        at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68) 
        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1808) 
        at android.os.Handler.dispatchMessage(Handler.java:106) 
        at android.os.Looper.loop(Looper.java:193) 
        at android.app.ActivityThread.main(ActivityThread.java:6669) 
        at java.lang.reflect.Method.invoke(Native Method) 
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:493) 
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:858) 
```

The core of the problem seemed to be

```
Caused by: java.lang.RuntimeException: Exception inflating myapp:navigation/nav_graph line 14
    at androidx.navigation.NavInflater.inflate(SourceFile:14)
    at androidx.navigation.NavController.setGraph(SourceFile:2)
    at mydomain.HostActivity.onCreate(SourceFile:5)
...
Caused by: java.lang.ClassNotFoundException: Didn't find class "mydomain.models.ControlDTO"
```

The method that caused the crash is `onCreate`

{% highlight Kotlin %}
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.host_activity)
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        navController = navHostFragment.findNavController()
        navController.setGraph(R.navigation.nav_graph, intent.extras)
    }
{% endhighlight %}

The crash happens on the `navController.setGraph()` line, the top of the `R.navigation.nav_graph` XML looked like this

{% highlight Xml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph"
    app:startDestination="@id/detailsFragment">

    <fragment
        android:id="@+id/detailsFragment"
        android:name="mydomain.DetailsFragment"
        tools:layout="@layout/details_fragment">
        <argument
            android:name="dto"
            app:argType="mydomain.models.ControlDTO" />
        <argument
{% endhighlight %}

Given that it worked fine in a debug build and only crashed in a release build, [Proguard handling of the androidx arguments][androidx-arguments-url] would seem to be the problem. I added this to the proguard file and the crash was fixed

```
# NavGraph SafeArgs
-keep class mydomain.models.ControlDTO
```

It turns out that every argument mentioned in the navigation graph needs to be excluded from proguard like this. So to stop this happening again I excluded the whole namespace and put all the navigation graph arguments in that namespace, like this

```
# NavGraph SafeArgs
-keep class mydomain.models.** { *; }
```




[androidx-navigation-url]:			https://developer.android.com/guide/navigation/navigation-getting-started
[proguard-url]:                     https://www.guardsquare.com/proguard
[androidx-arguments-url]:           https://developer.android.com/guide/navigation/navigation-pass-data


