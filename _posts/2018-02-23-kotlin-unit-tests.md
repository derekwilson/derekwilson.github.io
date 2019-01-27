---
layout: post
title:  "Unit testing using Mockito and Kotlin"
date:   2018-02-23 12:00:00
published: true
tags: ["Android", "Development", "Kotlin"]
categories: ["Android", "Development", "Kotlin"]
---

I am staring to get to grips with [Kotlin][kotlin-url] and I have writted about my challenges in [starting a new Kotlin project][previous-post-url]. The project has been progressing well and hopefully will be published this year. I have tripped over an issue in writing unit tests.

In Java classes are only sealed if you use the keyword `final`. By contrast in Kotlin classes are sealed by default and can only be inherited or overridden if we use the keyword `open`.

That was perfectly fine while I was writing the code I produced classes like this

{% highlight Kotlin linenos %}
class LocalBinder : Binder() {
	val service: IGpsLoggerService
		get() = this@GpsLoggerService
}
{% endhighlight %}

However when I was trying to write a test and provide a mock `IGpsLoggerService` to the test I ran into problems. I have to say most of the problems revolve around the very poor state of Mockito/Kotlin error messages, I hope this will improve as Kotlin becomes more mainstream in Android development.

In the setup for tests that relied on the GPS service I wrote this

{% highlight Kotlin linenos %}
mockservice = mock(IGpsLoggerService::class.java)
mockbinder = mock(GpsLoggerService.LocalBinder::class.java)
Mockito.`when`(mockbinder.service).thenReturn(mockservice)
{% endhighlight %}

However when I tried to run this I got this error

```
org.mockito.exceptions.base.MockitoException: 
Cannot mock/spy class com.andrewandderek.trailblazer.service.gpslogger.GpsLoggerService$LocalBinder
Mockito cannot mock/spy because :
 - final class
```

OK, I though that makes sense I need to make the `LocalBinder` class `open`. I did that but then I got the following error

```
org.mockito.exceptions.misusing.CannotStubVoidMethodWithReturnValue: 
'debug' is a *void method* and it *cannot* be stubbed with a *return value*!
Voids are usually stubbed with Throwables:
    doThrow(exception).when(mock).someVoidMethod();
If you need to set the void method to do nothing you can use:
    doNothing().when(mock).someVoidMethod();
For more information, check out the javadocs for Mockito.doNothing().
```

This made no sense at all, there is no method called `debug`. I tried to change the property into a method, I tried changing to return type to be a simple `Int`but no matter what the method was called or returned I always got the same error. In the end I guessed that the method needed to be open as well. like this

{% highlight Kotlin linenos %}
open class LocalBinder : Binder() {
	open val service: IGpsLoggerService
		get() = this@GpsLoggerService
}
{% endhighlight %}

Another approach, which is the one I settled on, was to enable the experimental [feature in Mockito][mockito-final-feature-url] to allow mocking of final classes. I know this is experimental but it seems to work for my project, I followed the [instructions in this blog][enable-mockito-final-url].


[previous-post-url]:			/blog/2017/11/27/kotlin-dagger
[kotlin-url]:					https://kotlinlang.org/
[mockito-final-feature-url]:	https://github.com/mockito/mockito/wiki/What%27s-new-in-Mockito-2#unmockable
[enable-mockito-final-url]:		https://antonioleiva.com/mockito-2-kotlin/


