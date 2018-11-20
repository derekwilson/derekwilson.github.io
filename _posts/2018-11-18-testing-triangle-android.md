---
layout: post
title:  "Setting up an Android project testing framework"
date:   2018-11-18 12:00:00
published: true
tags: ["Android", "Development", "Kotlin"]
categories: ["Android", "Development", "Kotlin"]
---

In my spare time I have started to work on a Android project and its nearing the point where we can publish the first release. The project is an Android app that is entirely written in Kotlin.

In this project and in my professional life I find that we are often discussing how we should structure our testing framework with reference to the [testing triangle][triangle-1-url] and also [Martin Fowler's take on it][triangle-2-url]

The general drift is that unit tests are the cheapest and most cost effective method of testing but there are some things, such as UI testing that dont lend themselves to this approach.

The more I see of tests above the unit test layer in the triangle the more I question their value at all. I can see that by having UI tests then the cost and risk of missing something by manual testing is lowered however in practice, in my experience I have found the following problems

1. **Brittle.** Many people have commented on this but nothing prepared me for how brittle they really are. I have worked on projects at work where we have spent sprint after sprint in a futile effort to make the "tests go green". In android this is even worse as they need to be run in an emulator or on a device.
1. **Difficult to write.** Unit tests can and probably should be written by the developer of the code however by the time we get to UI tests they are probably best written by people who think like testers, that may not be a strength of a developer, conversely if a tester writes them then they can easily become unmanageable which leads to brittleness. 
1. **Not that useful for smoke testing.** Most of the testers I have worked with are sceptical about using automated tests for smoke testing as there is great value in manually "having a play" with the software.
1. **Expensive.** To write and to run.
1. **Not good value.** Often I have had a unit test find bugs for me in code, however I have never seen a UI test do the same. Now I know this is anecdotal evidence however I find it interesting that none of the projects I have worked on record how often UI tests find bugs, they do not measure how much value they are providing.

I do understand that UI tests can provide value, I just think that the value is small and the cost high. In general with limited resource I can think of better places to spend my resources. This spare time project has very limited resources so I though it would be interesting to see where we spend them.

# Unit tests

Most of our tests are unit tests, and use JUnit and run on the standard desktop JVM. The setup is quite straighforward, the following dependencies are added to the `build.gradle` file

```
 // unit tests
 testImplementation "junit:junit:4.12"
 testImplementation "org.mockito:mockito-core:2.15.0"
```
The run configuration in Android Studio looks like this

{% include widgets/image.html src='/images/jekyll/2018-11-01/unittests.png' width='300' height='200' title='UnitTests' %}

To be able to test a piece of code it needs to be isolated from any Android code, as Android does not exist on the desktop JVM. You can cheat a little by adding the following to your `build.gradle`.

```
 testOptions {
  unitTests.returnDefaultValues = true
 }
```

However if you can structure your code I would recommend avoiding this. One example of how the project is structured is the use of IResourceProvider

{% highlight Kotlin linenos %}
interface IResourceProvider {
 fun getString(id: Int): String
}

class AndroidResourceProvider
@Inject constructor(
 internal var context: Context
) : IResourceProvider
{
 override fun getString(id: Int): String {
  return context.getString(id)
 }
}
{% endhighlight %}

Then in production code we can do this

{% highlight Kotlin linenos %}
class TrackListPresenter
@Inject constructor(
 private val loggerFactory: ILoggerFactory,
 private val schedulerProvider: ISchedulerProvider,
 private val trackRepository: ITrackRepository,
 private val positionRepository: IPositionRepository,
 private val resourceProvider: IResourceProvider,
 private val trackingServiceController: IGpsLoggerServiceController
)
 : ITrackListPresenter, IGpsLoggerServiceConnectionListener
{
 override fun getTrackLabel(position: Int): String {
  if (position > itemCount-1) {
   return resourceProvider.getString(R.string.track_list_item_unknown)
  }
  val track = tracks!![position]
  return String.format(resourceProvider.getString(R.string.track_list_item_title_fmt), track.name)
 }

 override fun getTrackSubLabel(position: Int): String {
 if (position > itemCount-1) {
  return resourceProvider.getString(R.string.track_list_item_unknown)
 }
 val track = tracks!![position]
 if (isThisTrackCurrentlyBeingRecorded(track.id)) {
  return String.format(
   resourceProvider.getString(R.string.track_list_item_subtitle_recording_fmt),
   CalendarFormatter.convertCalendarToDateTimeString(track.started))
 } else if (isThisTrackCurrentlyPaused(track.id)) {
  return String.format(
   resourceProvider.getString(R.string.track_list_item_subtitle_paused_fmt),
   CalendarFormatter.convertCalendarToDateTimeString(track.started))
 }
 var endTime = ""
 if (!track.isEmpty) {
  endTime = "${CalendarFormatter.convertCalendarToTimeString(track.lastPositionInSnapshot!!.timeRecorded)}"
 }
 return String.format(
  resourceProvider.getString(R.string.track_list_item_subtitle_fmt), 
  CalendarFormatter.convertCalendarToDateTimeString(track.started), endTime)
 }
{% endhighlight %}

and in the tests we can do this

{% highlight Kotlin linenos %}
@Before
fun before_each_test() {
 presenter = TrackListPresenter(
  mockLoggerFactory, 
  mockScheduler, 
  mockTrackRepository, 
  mockPositionRepository, 
  mockResourceProvider, 
  mockServiceController)

 Mockito.`when`(mockbinder.service).thenReturn(mockservice)

 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_title)).thenReturn("TEST_TITLE")
 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_title_fmt)).thenReturn("TEST_TITLE %s")

 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_item_unknown)).thenReturn("TEST_1")
 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_item_title_fmt)).thenReturn("TEST_TITLE %s")
 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_item_subtitle_fmt)).thenReturn("TEST_SUBTITLE %s - %s")
 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_item_subtitle_recording_fmt)).thenReturn("TEST_SUBTITLE_RECORDING %s")
 Mockito.`when`(mockResourceProvider.getString(R.string.track_list_item_subtitle_paused_fmt)).thenReturn("TEST_SUBTITLE_PAUSED %s")
 presenter.bind(mockview)
}

@After
fun after_each_test() {
 presenter.unbind(mockview)
}

@Test
fun trackList_itemOutOfRange() {
 // arrange
 setupTrackListItems()
 presenter.loadTracks()

 // act
 var resultLabel = presenter.getTrackLabel(123)
 var resultSubLabel = presenter.getTrackSubLabel(123)

 // assert
 Assert.assertEquals("TEST_1", resultLabel)
 Assert.assertEquals("TEST_1", resultSubLabel)
}
{% endhighlight %}

# Integration tests

There is some code that we cannot write unit tests for. This is usually because we want to test how we interact with implementations that only exist in Android. In our case we needed to test that we were able to use `XmlSerializer`, `SQLite` and SQL queries. We could have used something like [Robolectric][robolectric-url] but in the end we elected to write tests that use the actual Android implementation on a device. This is because in the past Robolectric has proved to be less than easy to work with in terms of updates and also because we want to test the actual SQL results and the actual XML rendered. We try and keep these tests to a minimum as they are more fiddly to run but we have found the value in them to be worth it.

Its worth noting that the test we are writing here are to test business logic that we cannot test on the desktop JVM, we are not testing the UI.

To set them up we add these dependencies to the `build.gradle`

```
// integration tests
androidTestImplementation('com.android.support.test.espresso:espresso-core:3.0.1', {
 exclude group: 'com.android.support', module: 'support-annotations'
})
androidTestImplementation 'org.hamcrest:hamcrest-library:1.3'
androidTestImplementation "org.mockito:mockito-android:2.15.0"
```

The run configuration in Android Studio looks like this

{% include widgets/image.html src='/images/jekyll/2018-11-01/integrationtests.png' width='300' height='200' title='IntegrationTests' %}

we also need to add our own custom test runner like this

```
android {
 compileSdkVersion 26
 buildToolsVersion '28.0.3'
 defaultConfig {
  applicationId "com.andrewandderek.trailblazer"
  minSdkVersion 14
  targetSdkVersion 26
  versionCode 3
  versionName "1.0.2"
  testInstrumentationRunner "com.andrewandderek.trailblazer.TestRunner"
}
```

The test runner is a very simple class that we use to create our own application like this

{% highlight Kotlin linenos %}
class TestRunner : AndroidJUnitRunner() {
 @Throws(InstantiationException::class, IllegalAccessException::class, ClassNotFoundException::class)
 override fun newApplication(cl: ClassLoader, className: String, context: Context): Application {
  return super.newApplication(cl, TestApplication::class.java.getName(), context)
 }
}
{% endhighlight %}

We derive our own `TestApplication` because there are some parts of the production application that we want to turn off.

{% highlight Kotlin linenos %}
class TestApplication : AndroidApplication() {
 override fun initialiseDatabase() {
  // we dont want to create the default DB for the tests its just not useful
  loggerFactory.logger.debug("database initialisation suppressed")
 }
}
{% endhighlight %}

For example we dont want to go through the performance of creating our default database schema for every test so we override that method and dont do anything.

To test our interactions with the SQLite database we create a brand new empty in memory database for each test like this

{% highlight Kotlin linenos %}

interface IDatabaseFactory {
 fun getDatabaseHelper(databaseName: String?): DatabaseHelper
 val inMemoryDatabaseHelper: DatabaseHelper
}

class DatabaseFactory
 @Inject constructor(
  internal var loggerFactory: ILoggerFactory,
  internal var applicationContext: Context
 )
 : IDatabaseFactory
{
 override val inMemoryDatabaseHelper: DatabaseHelper
  get() = getDatabaseHelper(null)

 // we need to use a factory to be able to name multiple databases
 override fun getDatabaseHelper(databaseName: String?): DatabaseHelper {
  return DatabaseHelper(applicationContext, databaseName, null, loggerFactory)
 }
}

@RunWith(AndroidJUnit4::class)
@MediumTest
class TrackRepositoryTests : DataTestsBase() {
 private lateinit var dbHelper: DatabaseHelper
 private lateinit var trackRepository: TrackRepository
 private lateinit var track1: Track

 protected fun createInMemoryDatabase() {
  var context = InstrumentationRegistry.getTargetContext()
  var factory = DatabaseFactory(loggerFactory, context)
  dbHelper = factory.inMemoryDatabaseHelper
  dbHelper.open()         // we must open the DB this way otherwise we dont get our pragmas
 }

 @Before
 fun before_each_test() {
  createInMemoryDatabase()
  trackRepository = TrackRepository(loggerFactory, dbHelper)
  track1 = Track()
  track1.name = "NAME1"
  track1.notes = "NOTES1"
 }

 @Test
 fun create_getById() {
  // arrange
  trackRepository.create(track1)

  // act
  var result = trackRepository.getById(1)

  // assert
  // we get a brand new DB for each test so we know its ID is 1
  Assert.assertEquals(1L, result!!.id)
  Assert.assertEquals(track1.name, result.name)
  Assert.assertEquals(track1.notes, result.notes)
 }

{% endhighlight %}

Both the production code and the tests use a `DatabaseFactory`, the production code creates a named database on storage and the tests create an unnamed database in memory.

# Smoke tests

The other form of testing that we do is smoke testing. This is a manual test script that we follow jusy prior to uploading the app the the store. The script goes something like this

1. Goto Settings, does the Version match this build?
1. Goto Open-source Licenses
1. Goto Privacy statement
1. Goto Main, does the map display?
1. Start a track, does the map zoom and the title change?
1. Is the notification displayed?
1. Goto statistics
1. Pause the track, does the title change?
1. Goto statistics
1. Stop the track, does the title change?
1. Is the notification removed?
1. Goto statistics
1. Goto Select Tracks, rename the track and select it
1. Is it displayed and the title changed
1. Share the track via email
1. Export the track, is the file present?
1. Import a track, does it display and are the statistics available
1. Record a second track and delete it

The intention here is to hit the most mission critical parts of the app in a test that can be quickly run, it should take less than 5 minutes. The plan is for it to take less than 10 minutes, when we get to that length of time we should remove one step for every step we add. It indicates the flow though the app leaving the tester to check the fine detail or vary the route.

# The balance of the tests

The project is not at its first release yet so the figures are not final, but as it stands we have around 40 integration tests and over 250 unit tests, I would envisage that the number of unit tests will increase dramatically but the integration tests not.

[triangle-1-url]:			https://dzone.com/articles/the-battle-of-the-testing-triangle
[triangle-2-url]:			https://martinfowler.com/bliki/TestPyramid.html
[robolectric-url]:			http://robolectric.org


