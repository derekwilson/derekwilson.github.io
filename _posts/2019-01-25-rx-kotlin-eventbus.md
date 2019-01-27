---
layout: post
title:  "An event bus for projects that use RX and Kotlin"
date:   2019-01-25 12:00:00
published: true
tags: ["Android", "Development", "Kotlin"]
categories: ["Android", "Development", "Kotlin"]
---

An event bus is a useful thing, when a UI is decoupled from the business logic it is often used to be able to signal state changes. The thing is that I am trying really hard to not take dependencies when I dont have to, experience has taught me that they come back to bite me in the years that follow.

In Android-land I could have used [Otto][otto-url] or [Event Bus][eventbus-url]. However when I looked there were any number of articles that recommended that if you were already had a dependency on RX that is was so easy to implement an event bus that you should not take another dependency. The article I found that inspired me was here

http://nerds.weddingpartyapp.com/tech/2014/12/24/implementing-an-event-bus-with-rxjava-rxbus/

Its a shame - but like so many dependencies the link no longer works.

The thing is, I was writing in Kotlin and this example was in Java so I needed to adapt it, I was also inspired by [this article][kotlin-eventbus-url] and eventually settled in this interface for my event bus.

{% highlight Kotlin linenos %}
interface IEventBusSubscription {
  fun unsubscribe()
}

interface IEventBus {
  fun publish(event: Any)

  fun <EVENT_TYPE> subscribe(eventType: Class<EVENT_TYPE>, receiver: (EVENT_TYPE) -> Unit): IEventBusSubscription

  fun <EVENT_TYPE> subscribe(eventType: Class<EVENT_TYPE>, receiver: (EVENT_TYPE) -> Unit, errorReceiver: (Throwable) -> Unit): IEventBusSubscription
}
{% endhighlight %}

This describes a logical publish/subscribe event bus without tying my app to an implementation.

Implementing it using RX was pretty straightforward

{% highlight Kotlin linenos %}
class RxEventBusSubscription constructor(private val rxSubscription: Disposable) : IEventBusSubscription {
  override fun unsubscribe() = rxSubscription.dispose()
}

class RxEventBus
  @Inject constructor(
    private val loggerFactory: ILoggerFactory,
    private val crashReporter: ICrashReporter,
    private val schedulerProvider: ISchedulerProvider
)
: IEventBus {
  private val publisher: PublishSubject<Any> = PublishSubject.create()

  override fun publish(event: Any) {
    if (publisher.hasObservers()) {
      publisher.onNext(event)
    }
  }

  override fun <EVENT_TYPE> subscribe(eventType: Class<EVENT_TYPE>, receiver: (EVENT_TYPE) -> Unit): IEventBusSubscription {
    return subscribe(eventType, receiver)
      { error: Throwable ->
        crashReporter.logNonFatalException(error)
      }
    }

  override fun <EVENT_TYPE> subscribe(eventType: Class<EVENT_TYPE>, receiver: (EVENT_TYPE) -> Unit, errorReceiver: (Throwable) -> Unit): IEventBusSubscription {
    val subscriber = publisher
      .toFlowable(BackpressureStrategy.BUFFER)
      .observeOn(schedulerProvider.androidMainThread())
      .ofType(eventType)
      .subscribe(
      { event ->
        receiver(event)
      },
      { error: Throwable ->
        errorReceiver(error)
      }
    )
    return RxEventBusSubscription(subscriber)
  }
}
{% endhighlight %}

To publish an event I just do this

{% highlight Kotlin linenos %}
class RecordingStatusChangedEvent(val statusChangedTo: String)

eventBus.publish(RecordingStatusChangedEvent(TrackRecordingControls.ACTION_STOP))
{% endhighlight %}

And using it went like this

{% highlight Kotlin linenos %}
override fun bind(theView: IMainView, savedInstanceState: Bundle?) {
  eventBusSubscriber = eventBus.subscribe(RecordingStatusChangedEvent::class.java)
  { event ->
    // we dont actually care what the new status is we just need to update the UI
    theView.updateAvailableActions()
    refreshTitle()
  }
}
{% endhighlight %}

Now maybe this isn't a great implementation but if that's the case then I can reimplement the interface if that proves to be true.

[eventbus-url]:			https://github.com/greenrobot/EventBus
[otto-url]:				http://square.github.io/otto/
[kotlin-eventbus-url]:	https://jayrambhia.com/notes/eventbus-rxkotlin


