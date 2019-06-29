---
layout: post
title:  "JUnit test error: Stub!"
date:   2019-06-28 12:00:00
published: true
tags: ["Android", "Development", "Kotlin"]
categories: ["Android", "Development", "Kotlin"]
---

I was using two different computers with my new [Trailblazer][trailblazer-source] project and I noticed something odd, one unit test failed on one of the computers and they all passed on the other. I check that everything was up to date on both and that the Git hash we were building from was the same.

I was weird but consistent I kept seeing this error

```
java.lang.RuntimeException: Stub!

	at android.content.ActivityNotFoundException.<init>(ActivityNotFoundException.java:30)
	at com.andrewandderek.trailblazer.unittests.ui.main.ImportTrackTests.import_track_fails_back(ImportTrackTests.kt:103)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)
	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)
	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)
	at org.junit.internal.runners.statements.RunAfters.evaluate(RunAfters.java:27)
	at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)
	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:78)
	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:57)
	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)
	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)
	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)
	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)
	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)
	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)
	at org.junit.runners.Suite.runChild(Suite.java:128)
	at org.junit.runners.Suite.runChild(Suite.java:27)
	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)
	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)
	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)
	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)
	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)
	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)
	at org.junit.runner.JUnitCore.run(JUnitCore.java:137)
	at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:68)
	at com.intellij.rt.execution.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:47)
	at com.intellij.rt.execution.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:242)
	at com.intellij.rt.execution.junit.JUnitStarter.main(JUnitStarter.java:70)

org.mockito.exceptions.misusing.UnfinishedStubbingException: 
```

This is a generic error that seems to get thrown by [Mockito][mockito-url] for any number of reasons - [this question for example][example-stackoverflow].

After much experimentation I did discover one difference on the Project Structure dialog

{% include widgets/image.html src='/images/jekyll/2019-06-01/asjdk.png' width='300' height='200' title='IntegrationTests' %}

One one machine - the one that was working - was using the Android Studio embedded JDK, as recommended. The other - with the failing test was using the Oracle JDK external JDK that I had installed. WHen I switched to using the embedded JDK on both machines then all the tests worked.

Still not sure why the test was failing....

[trailblazer-source]: 		https://bitbucket.org/andrewandderek/trailblazer/src/master/
[mockito-url]:				http://site.mockito.org
[example-stackoverflow]: 	https://stackoverflow.com/questions/54036101/how-to-resolve-java-lang-runtimeexception-stub-error-in-java-file

