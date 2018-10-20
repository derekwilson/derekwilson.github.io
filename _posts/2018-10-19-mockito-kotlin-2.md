---
layout: post
title:  "Using mockito with kotlin - part 2"
date:   2018-10-19 12:00:00
published: true
tags: ["Android", "Development", "Kotlin"]
categories: ["Android", "Development", "Kotlin"]
---

In a [previous post][previous-post-url] I looked at the problems I had been having using [Mockito][mockito-url] in a Kotlin project and the small helper functions that could make things easier. At the end of that post I said that I didnt have a good solution to the problems of using a captor. I really didn't want to add another dependency like [mockito-kotlin][mockito-kotlin-url]. Well it turns out there is a solution.

# Argument captors

The problem is that if a method does not take a nullable parameter then an error is generated when the test is run.

{% highlight Kotlin linenos %}
@Test
fun draw_a_track_with_captor() {
  // arrange
  val displayTrack = setupDisplayTrackWithTwoPoints()

  // act
  presenter.displayTrack(DISPLAY_TRACK_ID)

  // assert
  val captor: ArgumentCaptor<Position> = ArgumentCaptor.forClass(Position::class.java)
  Mockito.verify(mockview, Mockito.times(1)).resetMapToPosition(captor.capture())
  val capturedPositions: List<Position> = captor.allValues
  assertThat("there should only be one position", capturedPositions.size, `is`(1))
}
{% endhighlight %}

When we run the test we get this error

```
java.lang.IllegalStateException: captor.capture() must not be null

  at com.andrewandderek.trailblazer.unittests.ui.main.DisplayTrackTests.draw_a_track_with_captor(DisplayTrackTests.kt:93)
...

org.mockito.exceptions.misusing.InvalidUseOfMatchersException: 
Invalid use of argument matchers!
```

This is because the signature for resetMapToPosition() look like this

```
fun resetMapToPosition(position: Position)
```

If the method took a `Position?` then all would be well, but as captor.capture() returns `null` the test will not run.

# Fixing argument captors

I found this one line function on this [very useful page][capture-fix-url] Using this function means that we can overone the captor problem without any additional library.

{% highlight Kotlin linenos %}
object MockitoHelper {
  // use this in place of captor.capture() if you are trying to capture an argument that is not nullable
  fun <T> capture(argumentCaptor: ArgumentCaptor<T>): T = argumentCaptor.capture()
}
{% endhighlight %}

The test now look like this

{% highlight Kotlin linenos %}
@Test
fun draw_a_track_with_captor() {
  // arrange
  val displayTrack = setupDisplayTrackWithTwoPoints()

  // act
  presenter.displayTrack(DISPLAY_TRACK_ID)

  // assert
  val captor: ArgumentCaptor<Position> = ArgumentCaptor.forClass(Position::class.java)
  Mockito.verify(mockview, Mockito.times(1)).resetMapToPosition(MockitoHelper.capture(captor))
  val capturedPositions: List<Position> = captor.allValues
  assertThat("there should only be one position", capturedPositions.size, `is`(1))
  assertThat("incorrect value", capturedPositions[0].notes, `is`("POSITION_NOTES_1"))
}
{% endhighlight %}

[previous-post-url]:			/blog/2018/08/23/mokito-kotlin
[mockito-url]:					http://site.mockito.org
[mockito-kotlin-url]:			https://github.com/nhaarman/mockito-kotlin
[capture-fix-url]:				https://lonelycoding.com/is-it-possible-to-use-mockito-in-kotlin/


