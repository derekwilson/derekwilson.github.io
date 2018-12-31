---
layout: post
title:  "Configuring Logback for Android"
date:   2018-12-30 12:00:00
published: true
tags: ["Android", "Development"]
categories: ["Android", "Development"]
---

I like using logging in my code, I know that some people think it makes the code look messy but over the years having decent logging has saved me so many times that I still favour the approach.

On Android I have used [SLF4J][slf4j-url] and [logback][logback-url]. They really work, they are reliable and small and play well with testing.

My default configuration looks like this.

{% highlight xml linenos %}
<configuration debug="true">

    <!-- this is the app local data area so that we do not need storage permission to write there -->
    <property name="LOG_HOME" value="${DATA_DIR}" />

    <!-- Create a logcat appender -->
    <appender name="logcat" class="ch.qos.logback.classic.android.LogcatAppender">
        <encoder>
            <pattern>%msg</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_HOME}/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>${LOG_HOME}/app.%i.log</fileNamePattern>
            <minIndex>1</minIndex>
            <maxIndex>2</maxIndex>
        </rollingPolicy>

        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <maxFileSize>500KB</maxFileSize>
        </triggeringPolicy>
        <encoder>
            <pattern>%date{yyyy-MMM-dd HH:mm:ss.SSS} %t %r %logger{15} - %msg%n</pattern>
        </encoder>
    </appender>

    <logger
        name="main"
        level="DEBUG"
    >
        <appender-ref ref="logcat" />
        <appender-ref ref="FILE" />
    </logger>

    <root level="DEBUG">
        <appender-ref ref="logcat" />
        <appender-ref ref="FILE" />
    </root>

</configuration>
{% endhighlight %}

I like this configuration as it logs to the logcat window in Android Studio and also writes to a rolling file listener, which is great if I want to look at logs that were created when the device is not attached to a dev machine. The key bit is the value of the `LOG_HOME` property `${DATA_DIR}` is predefined by logback so that we can write to the local data directory for the app without needing the `WRITE_EXTERNAL_STORAGE` permission.

It can be a bit fiddly to get at the data directory as it cannot be access from the phone's file system for security reasons. To get at the log files I need to use Android Studio to access the files in `/data/data/<YOUR-APP-NAMESPACE>/files/app.log`

If you already request `WRITE_EXTERNAL_STORAGE` then you can write directly to the external storage by setting the `LOG_HOME` property to be something like `/sdcard/Android/data/<YOUR-APP-NAMESPACE>/files`

However be careful because if you dont have the permission granted when you try to write then you will just not see any logging to the file, all you will get is the following error 

```
 -INFO in ch.qos.logback.classic.LoggerContext[default] - Found resource [assets/logback.xml] at [assets/logback.xml]
 -INFO in ch.qos.logback.core.joran.action.AppenderAction - About to instantiate appender of type [ch.qos.logback.classic.android.LogcatAppender]
 -INFO in ch.qos.logback.core.joran.action.AppenderAction - Naming appender as [logcat]
 -INFO in ch.qos.logback.core.joran.action.NestedComplexPropertyIA - Assuming default type [ch.qos.logback.classic.encoder.PatternLayoutEncoder] for [encoder] property
 -INFO in ch.qos.logback.core.joran.action.AppenderAction - About to instantiate appender of type [ch.qos.logback.core.rolling.RollingFileAppender]
 -INFO in ch.qos.logback.core.joran.action.AppenderAction - Naming appender as [FILE]
 -INFO in ch.qos.logback.core.rolling.FixedWindowRollingPolicy@3b3e925 - No compression will be used
 -INFO in ch.qos.logback.core.joran.action.NestedComplexPropertyIA - Assuming default type [ch.qos.logback.classic.encoder.PatternLayoutEncoder] for [encoder] property
 -INFO in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - Active log file name: /sdcard/Android/data/net.derekwilson.remotecontrol/files/app.log
 -INFO in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - File property is set to [/sdcard/Android/data/net.derekwilson.remotecontrol/files/app.log]
 -ERROR in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - Failed to create parent directories for [/sdcard/Android/data/net.derekwilson.remotecontrol/files/app.log]
 -ERROR in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - openFile(/sdcard/Android/data/net.derekwilson.remotecontrol/files/app.log,true) failed java.io.FileNotFoundException: /sdcard/Android/data/net.derekwilson.remotecontrol/files/app.log: open failed: ENOENT (No such file or directory)
     at java.io.FileNotFoundException: /sdcard/Android/data/net.derekwilson.remotecontrol/files/app.log: open failed: ENOENT (No such file or directory)
     at 	at libcore.io.IoBridge.open(IoBridge.java:456)
     at 	at java.io.FileOutputStream.<init>(FileOutputStream.java:87)
     at 	at ch.qos.logback.core.recovery.ResilientFileOutputStream.<init>(Unknown Source)
     at 	at ch.qos.logback.core.FileAppender.openFile(Unknown Source)
     at 	at ch.qos.logback.core.FileAppender.start(Unknown Source)
     at 	at ch.qos.logback.core.rolling.RollingFileAppender.start(Unknown Source)
     at 	at ch.qos.logback.core.joran.action.AppenderAction.end(Unknown Source)
     at 	at ch.qos.logback.core.joran.spi.Interpreter.callEndAction(Unknown Source)
     at 	at ch.qos.logback.core.joran.spi.Interpreter.endElement(Unknown Source)
     at 	at ch.qos.logback.core.joran.spi.Interpreter.endElement(Unknown Source)
     at 	at ch.qos.logback.core.joran.spi.EventPlayer.play(Unknown Source)
     at 	at ch.qos.logback.core.joran.GenericConfigurator.doConfigure(Unknown Source)
     at 	at ch.qos.logback.core.joran.GenericConfigurator.doConfigure(Unknown Source)
     at 	at ch.qos.logback.core.joran.GenericConfigurator.doConfigure(Unknown Source)
     at 	at ch.qos.logback.classic.util.ContextInitializer.autoConfig(Unknown Source)
     at 	at org.slf4j.impl.StaticLoggerBinder.init(Unknown Source)
     at 	at org.slf4j.impl.StaticLoggerBinder.<clinit>(Unknown Source)
     at 	at org.slf4j.LoggerFactory.bind(LoggerFactory.java:150)
     at 	at org.slf4j.LoggerFactory.performInitialization(LoggerFactory.java:124)
     at 	at org.slf4j.LoggerFactory.getILoggerFactory(LoggerFactory.java:412)
     at 	at org.slf4j.LoggerFactory.getLogger(LoggerFactory.java:357)
     at 	at org.slf4j.LoggerFactory.getLogger(LoggerFactory.java:383)
     at 	at net.derekwilson.remotecontrol.logging.Slf4jLoggerFactory.getLogger(Slf4jLoggerFactory.kt:11)
     at 	at net.derekwilson.remotecontrol.AndroidApplication.onCreate(AndroidApplication.kt:35)
     at 	at android.app.Instrumentation.callApplicationOnCreate(Instrumentation.java:1012)
     at 	at android.app.ActivityThread.handleBindApplication(ActivityThread.java:4553)
     at 	at android.app.ActivityThread.access$1500(ActivityThread.java:151)
     at 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1364)
     at 	at android.os.Handler.dispatchMessage(Handler.java:102)
     at 	at android.os.Looper.loop(Looper.java:135)
     at 	at android.app.ActivityThread.main(ActivityThread.java:5254)
     at 	at java.lang.reflect.Method.invoke(Native Method)
     at 	at java.lang.reflect.Method.invoke(Method.java:372)
     at 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:903)
     at 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:698)
 Caused by: android.system.ErrnoException: open failed: ENOENT (No such file or directory)
     at 	at libcore.io.Posix.open(Native Method)
     at 	at libcore.io.BlockGuardOs.open(BlockGuardOs.java:186)
     at 	at libcore.io.IoBridge.open(IoBridge.java:442)
 	at 	... 34 common frames omitted
-INFO in ch.qos.logback.classic.joran.action.LoggerAction - Setting level of logger [main] to DEBUG
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [logcat] to Logger[main]
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [FILE] to Logger[main]
-INFO in ch.qos.logback.classic.joran.action.RootLoggerAction - Setting level of ROOT logger to DEBUG
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [logcat] to Logger[ROOT]
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [FILE] to Logger[ROOT]
-INFO in ch.qos.logback.classic.joran.action.ConfigurationAction - End of configuration.
-INFO in ch.qos.logback.classic.joran.JoranConfigurator@32def2a1 - Registering current configuration as safe fallback point
D/net.derekwilson.remotecontrol.AndroidApplication: app onCreate Version 0.0.1 - ddba1d7
-WARN in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - Attempted to append to non started appender [FILE].
D/net.derekwilson.remotecontrol.AndroidApplication: MainActivity.onCreate()
-WARN in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - Attempted to append to non started appender [FILE].
```

There  is a pretty good [explanation][logback-error-url] of the error in the logback repo on github.

For reference, if the logging is working properly then the logcat trace should look like this

```
-INFO in ch.qos.logback.classic.LoggerContext[default] - Found resource [assets/logback.xml] at [assets/logback.xml]
-INFO in ch.qos.logback.core.joran.action.AppenderAction - About to instantiate appender of type [ch.qos.logback.classic.android.LogcatAppender]
-INFO in ch.qos.logback.core.joran.action.AppenderAction - Naming appender as [logcat]
-INFO in ch.qos.logback.core.joran.action.NestedComplexPropertyIA - Assuming default type [ch.qos.logback.classic.encoder.PatternLayoutEncoder] for [encoder] property
-INFO in ch.qos.logback.core.joran.action.AppenderAction - About to instantiate appender of type [ch.qos.logback.core.rolling.RollingFileAppender]
-INFO in ch.qos.logback.core.joran.action.AppenderAction - Naming appender as [FILE]
-INFO in ch.qos.logback.core.rolling.FixedWindowRollingPolicy@1c41bafa - No compression will be used
-INFO in ch.qos.logback.core.joran.action.NestedComplexPropertyIA - Assuming default type [ch.qos.logback.classic.encoder.PatternLayoutEncoder] for [encoder] property
-INFO in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - Active log file name: /data/data/net.derekwilson.remotecontrol/files/app.log
-INFO in ch.qos.logback.core.rolling.RollingFileAppender[FILE] - File property is set to [/data/data/net.derekwilson.remotecontrol/files/app.log]
-INFO in ch.qos.logback.classic.joran.action.LoggerAction - Setting level of logger [main] to DEBUG
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [logcat] to Logger[main]
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [FILE] to Logger[main]
-INFO in ch.qos.logback.classic.joran.action.RootLoggerAction - Setting level of ROOT logger to DEBUG
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [logcat] to Logger[ROOT]
-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [FILE] to Logger[ROOT]
-INFO in ch.qos.logback.classic.joran.action.ConfigurationAction - End of configuration.
-INFO in ch.qos.logback.classic.joran.JoranConfigurator@20608cc6 - Registering current configuration as safe fallback point
D/net.derekwilson.remotecontrol.AndroidApplication: app onCreate Version 0.0.1 - ddba1d7
```

[slf4j-url]:			https://www.slf4j.org
[logback-url]:			https://github.com/tony19/logback-android
[logback-error-url]:	https://github.com/tony19/logback-android/issues/145
