---
layout: post
title: "Code Review: Avoiding Mockito.any()"
date: 2018-05-24 12:00:00
published: true
tags: ["Android", "Code Review", "General", "Development"]
categories: ["Android", "Code Review", "General", "Development"]
---

I am continually amazed about the basic and obvious things that are picked up in code review, even for experienced developers.

I have been using [Mockito][mockito-url] for a number of years and its a great mocking framework. Every now and again I want to write a test like this

{% highlight java linenos %}
@Test
public void example_1() {
	setupPresenter(null);

	// act
	presenter.editTrackName(1);

	// assert
	Mockito.verify(mockview, Mockito.times(1)).promptForTrackName("1", Mockito.anyString());
}
{% endhighlight %}

I want to check that the first parameter passed to the `promptForTrackName` method is the string "1". I either genuinely do not care what the second parameter is or if its legacy code the second parameter is unpredictable. I know its not ideal but we dont always get to control the structure of code as much as we would want.

If I were to write a test like this in Mockito 2 I would get this error when the test is run

```
org.mockito.exceptions.misusing.InvalidUseOfMatchersException: 
Invalid use of argument matchers!
2 matchers expected, 1 recorded:
-> at com.andrewandderek.trailblazer.unittests.ui.tracklist.ExampleTests.example_1(ExampleTests.java:35)

This exception may occur if matchers are combined with raw values:
    //incorrect:
    someMethod(anyObject(), "raw String");
When using matchers, all arguments have to be provided by matchers.
For example:
    //correct:
    someMethod(anyObject(), eq("String by matcher"));

For more info see javadoc for Matchers class.
```

This error message is great and tells me exactly how to correct this. However older versions of Mockito the error message was not as good and it just said that I should make all the parameters any() or none.

So I could use captors to example each parameter or if I was lazy do this

{% highlight java linenos %}
@Test
public void example_2() {
	setupPresenter(null);

	// act
	presenter.editTrackName(1);

	// assert
	Mockito.verify(mockview, Mockito.times(1)).promptForTrackName(Mockito.anyString(), Mockito.anyString());
}
{% endhighlight %}

This worked but was not as good a test. I knew not to try the other test so I never saw the new error message.

Recently in a code review someone pointed out that I could simply do as the error message suggested and rewrite my test like this

{% highlight java linenos %}
public void example_3() {
	setupPresenter(null);

	// act
	presenter.editTrackName(1);

	// assert
	Mockito.verify(mockview, Mockito.times(1)).promptForTrackName(eq("1"), Mockito.anyString());
}
{% endhighlight %}

I did feel slightly foolish but I am glad to heave learnt a new trick - thanks Karl.

[mockito-url]:	http://site.mockito.org



