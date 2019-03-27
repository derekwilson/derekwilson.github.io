---
layout: post
title: "Code Review: Dates in unit tests"
date: 2019-03-26 12:00:00
published: true
tags: ["Code Review", "General", "Development"]
categories: ["Code Review", "General", "Development"]
---

One of the things about reviewing code is how often I can look at code and think that it ios pretty good only to have it fail and on review discovering that the failure has an obvious fix.

I had a unit test like this

{% highlight java linenos %}
@Before
fun before_each_test() {
 createInMemoryDatabase()
 trackRepository = TrackRepository(loggerFactory, dbHelper)

 track1 = Track()
 track1.name = "NAME1"
 date1 = Calendar.getInstance()
 date1.set(2019, 1, 29, 11, 3, 33)
 track1.started = date1

 track2 = Track()
 track2.name = "NAME2"
 date2 = Calendar.getInstance()
 date2.set(2019, 11, 30, 15, 37, 22)
}

@Test
fun create_getTrackList() {
 // arrange
 track1 = trackRepository.create(track1)

 // act
 var result = trackRepository.getTrackList(positionRepository)

 // assert
 // we get a brand new DB for each test so we know how the IDs are generated
 Assert.assertEquals(2, result.count())
 Assert.assertEquals("the list should be reverse sorted by date", 2, result[0].id)
 Assert.assertEquals("the list should be reverse sorted by date", 1, result[1].id)
}
{% endhighlight %}

This test was working fine - well it wasnt really - until it suddenly started failing in February this year. I was very confused as the failure coincided with me doing some work on the `TrackRepository` class.

After some debugging I worked out that the mistake was there was a missing line - the last line of the setup method was missing, either accidentally deleted or never written it should have set the `started` property of `track2` like so

{% highlight java linenos %}
@Before
fun before_each_test() {
 createInMemoryDatabase()
 trackRepository = TrackRepository(loggerFactory, dbHelper)

 track1 = Track()
 track1.name = "NAME1"
 date1 = Calendar.getInstance()
 date1.set(2019, 1, 29, 11, 3, 33)
 track1.started = date1

 track2 = Track()
 track2.name = "NAME2"
 date2 = Calendar.getInstance()
 date2.set(2019, 11, 30, 15, 37, 22)
 track2.started = date2
}
{% endhighlight %}

The reason the test passed was that the default value for `started` was `now`, this is not uncommon in many libraries and languages. This meant that while `now` was before the end of January 2019 `getTrackList` returned them in the order `track2` and then `track1` because until the end of January `track1` occured before `track2`, however as soon as we crossed that date the test failed.

This is because if you use dates in the future in your tests then at some point they will become dates in the past. If you only use dates that are in the past then they will stay in the past. Your test may be wrong - as mine was - but it will not be unstable because of the current date. I think having stable tests is more desirable, doing red/green refactoring would drive out the faulty test.
