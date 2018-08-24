---
layout: post
title:  "Using mockito with kotlin"
date:   2018-08-23 12:00:00
published: true
tags: ["Android", "Development", "Kotlin"]
categories: ["Android", "Development", "Kotlin"]
---

I have been using Mockito for a while and recently I have started a kotlin project. Using kotlin and mockito together throws up some interesting problems, I have [already looked][previous-post-url] at some of these.

# Argument matchers

Getting matchers to work with Kotlin can be a problem. If you have a method written in kotlin that does not take a nullable parameter then we cannot match with it using Mockito.any(). This is because it can return void and this is not assignable to a non-nullable parameter. If the method being matched is written in Java then I think that it will work as all Java objects are implicitly nullable.

One possible solution would be to use a library like [mockito-kotlin][mockito-kotlin-url]. However I wanted to avoid this because

1. I prefer not to take a dependency unless there is a significant benefit. There is no benefit here as we can overcome this issue with less than 10 lines of code.
1. Initially this library depended on a specific version of Kotlin and Mockito, later versions have removed the dependency on Kotlin however I am guessing that testing every combination is not possible.
1. I have used this library on a large project with many thousand of tests and as I updated the version of the library used different tests failed even before we started using the library.

To overcome this issue. I looked on the internet and found some [examples][matcher-fix-url] of how to overcome this.

## Fixing Mockito.any()

To be able to replace the Mockito.any() matcher with our own we need

{% highlight Kotlin linenos %}
object MockitoHelper {
    fun <T> anyObject(): T {
        Mockito.any<T>()
        return uninitialized()
    }
    @Suppress("UNCHECKED_CAST")
    fun <T> uninitialized(): T =  null as T
}
{% endhighlight %}

Using anyObject() means that we can now match like this

```
Mockito.`when`(mockGpxExporter.exportTrack(MockitoHelper.anyObject())).thenReturn(true)
Mockito.verify(mockGpxExporter, Mockito.never()).getShareFilename(MockitoHelper.anyObject())
```

## Fixing mock(GenericClass<Type>::class.java)

The other easily fixed problem is that we cannot mock generic classes. If we try and write 

```
mock = mock(GenericClass<Type>::class.java)
```

then we get an error like `Only classes are allowed on the left hand side of a class literal`

After checking the [issue][generic-fix-url] it is possible to fix this by creating another method like this. 

{% highlight Kotlin linenos %}
object MockitoHelper {
    inline fun <reified T: Any> mockGenericClass() = Mockito.mock(T::class.java)
}
{% endhighlight %}

Then we can write.

{% highlight Kotlin linenos %}
var mock: TestGeneric<Int>
fred = mockGenericClass()
{% endhighlight %}

# Argument captors

However, a similar problem happens when using argument captors, rather than matchers, and that is more complex to solve

If you have a test like this

{% highlight Kotlin linenos %}
@Captor
private lateinit var dtoCaptor: ArgumentCaptor<NetworkDTO>

@Test
fun turnOnSwitchesOn() {
    val provider: Provider = spy(Provider())
    val dto: NetworkDTO = getDto()
    provider.setResponseSuccess(dto)

    presenter.switchOn()

    verify(provider).sendData(
              "ON",
              dtoCaptor.capture()
      )
    assertThat(dtoCaptor.value, `is`(dto))
  }
{% endhighlight %}

Then you get an error like this when you run the test

```
java.lang.IllegalStateException: dtoCaptor.capture() must not be null
```

this is the same problem as we found with argument matchers. The sendData() method is written in Kotlin and the second parameter cannot be null.

We can try this

{% highlight Kotlin linenos %}
@Captor
private lateinit var dtoCaptor: ArgumentCaptor<NetworkDTO>

@Test
fun turnOnSwitchesOn() {
    val provider: Provider = spy(Provider())
    val dto: NetworkDTO = getDto()
    provider.setResponseSuccess(dto)

    presenter.switchOn()

    verify(provider).sendData(
              "ON",
              getDto()
      )
    assertThat(dtoCaptor.value, `is`(dto))
  }
{% endhighlight %}

But predictably this will not work as the two concrete DTO objects are different from each other, but it does indicate that the problem is with the captor.

```
Argument(s) are different! Wanted:
provider.sendData(
   "ON",
   com.andrewandderek.trailblazer.model.NetworkDTO@733fb462
);
-> at com.andrewandderek.trailblazer.unittests.ui.main.ExampleTest.turnOnSwitchesOn(ExampleTest.kt:318)
Actual invocation has different arguments:
customPushNotificationSubscriptionProvider.replaceSubscriptions(
   "ON",
   com.andrewandderek.trailblazer.model.NetworkDTO@623e0631
);
-> at com.andrewandderek.trailblazer.unittests.ui.main.ExampleTest.turnOnSwitchesOn(ExampleTest.kt:162)
```

We can also try eliminating mixing literals and matchers by making all of them matchers like this

{% highlight Kotlin linenos %}
@Captor
private lateinit var dtoCaptor: ArgumentCaptor<NetworkDTO>

@Test
fun turnOnSwitchesOn() {
    val provider: Provider = spy(Provider())
    val dto: NetworkDTO = getDto()
    provider.setResponseSuccess(dto)

    presenter.switchOn()

    verify(provider).sendData(
              eq("ON"),
              getDto()
      )
    assertThat(dtoCaptor.value, `is`(dto))
  }
{% endhighlight %}

However we get this bizarre error

```
java.lang.IllegalStateException: eq("ON") must not be null
```

It turns out that we cannot just fix this issue with a few lines of code, in fact fixing this is what most of the [mockito-kotlin][mockito-kotlin-url] library is about. 

For them moment I dont have a great solution. As it happens I have complete control over the codebase so I can eliminated the need to use argument captors. I am prepared to wait and see if either google, mockito or kotlin come up with a more stable solution.

[previous-post-url]:			/blog/2018/02/23/kotlin-unit-tests
[mockito-kotlin-url]:			https://github.com/nhaarman/mockito-kotlin
[matcher-fix-url]:				https://stackoverflow.com/questions/30305217/is-it-possible-to-use-mockito-in-kotlin
[generic-fix-url]:				https://discuss.kotlinlang.org/t/kotlin-unit-test-failing-when-using-generics-and-mockito/1866
