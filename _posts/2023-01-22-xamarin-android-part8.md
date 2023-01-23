---
layout: post
title:  "Xamarin Android Part 8"
date:   2023-01-22 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Custom Views in Xamarin Android Applications

This post is part of a [series of posts][part-1-url] exploring writing apps for Android using [Xamarin Android][xamarin-android-url]. 

I have found that the extra complexity of using fragments, with their similar but subtly different lifecycle from activities, to not really be worth the effort. So I tend to compose activities from custom views instead. One view I have used in multiple apps is a custom view to show the progress of a task.

As we have seen in Xamarin Android, the view layouts use the same XML as writing apps using Kotlin of Java and this custom view is no excpetion. The layout for the control looks like this

{% highlight XML linenos %}
<LinearLayout
	android:orientation="vertical"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	xmlns:android="http://schemas.android.com/apk/res/android">
	<TextView
		android:id="@+id/progress_bar_message"
		android:layout_width="match_parent"
		android:layout_height="wrap_content"
		android:paddingTop="5dp"
		android:textAlignment="center"
		android:background="@color/primary"
		android:alpha="0.8"
		android:textColor="@color/background"
		android:text="@string/placeholder"
		android:gravity="center_horizontal" />
	<ProgressBar
		android:id="@+id/indeterminateBar"
		android:layout_width="match_parent"
		android:layout_height="wrap_content"
		android:paddingTop="5dp"
		android:paddingBottom="5dp"
		android:background="@color/primary"
		android:alpha="0.5"
		android:indeterminate="true"
		/>
	<ProgressBar
		android:id="@+id/steppedBar"
		android:layout_width="match_parent"
		android:layout_height="wrap_content"
		android:background="@color/primary"
		android:alpha="0.8"
		android:max="10"
		android:progress="5"
		style="?android:attr/progressBarStyleHorizontal"
		android:indeterminate="false"
		/>
</LinearLayout>
{% endhighlight %}

I used the same layout when implementing the view in Kotlin and C#

### A progress custom view in Kotlin

The implementation in Kotlin is pretty standard android development

{% highlight Kotlin linenos %}
class ProgressSpinnerView : LinearLayout {

    @BindView(R.id.progress_bar_message)
    lateinit var messageView: TextView

    @BindView(R.id.indeterminateBar)
    lateinit var indeterminateBar: ProgressBar

    @BindView(R.id.steppedBar)
    lateinit var steppedBar: ProgressBar

    constructor(context: Context) : super(context) {
        init(context, null, 0)
    }

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init(context, attrs, 0)
    }

    constructor(context: Context, attrs: AttributeSet, defStyle: Int) : super(context, attrs, defStyle) {
        init(context, attrs, defStyle)
    }

    var message: String? = null
        set(value) {
            field = value
            messageView.text = value
        }

    var max: Int = 1
        set(value) {
            field = value
            steppedBar.max = value
        }

    var progress: Int = 0
        set(value) {
            field = value
            steppedBar.progress = value
        }

    private fun init(context: Context, attrs: AttributeSet?, defStyle: Int) {
        val view = inflateView(context)
        ButterKnife.bind(this, view)

        loadAttributes(attrs, defStyle)
    }

    private fun loadAttributes(attrs: AttributeSet?, defStyle: Int) {
        val a = context.obtainStyledAttributes(
                attrs, R.styleable.ProgressSpinnerView, defStyle, 0)

        message = a.getString(R.styleable.ProgressSpinnerView_message)

        a.recycle()
    }

    private fun inflateView(context: Context): View {
        val inflater: LayoutInflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        return inflater.inflate(R.layout.view_progress_spinner, this, true)
    }

    fun slideDown(indeterminateProgress: Boolean) {
        indeterminateBar.visibility = if (indeterminateProgress) View.VISIBLE else View.GONE
        steppedBar.visibility = if (indeterminateProgress) View.GONE else View.VISIBLE
        visibility = View.VISIBLE
        val animate = TranslateAnimation(
                0f,                  // fromXDelta
                0f,                  // toXDelta
                -height.toFloat(),   // fromYDelta
                0f)                  // toYDelta
        animate.duration = 500
        clearAnimation()
        startAnimation(animate)
    }

    fun slideUp() {
        visibility = View.GONE
        val animate = TranslateAnimation(
                0f,                  // fromXDelta
                0f,                  // toXDelta
                0f,                  // fromYDelta
                -height.toFloat())   // toYDelta
        animate.duration = 500
        clearAnimation()
        startAnimation(animate)
    }
}
{% endhighlight %}

### A progress custom view in C#

In C# the code is pretty much the same, with the slight differences in the syntax.

{% highlight C# linenos %}
namespace PodcastUtilities.AndroidLogic.CustomViews;

public class ProgressSpinnerView : LinearLayout
{
    private TextView messageView;
    private ProgressBar indeterminateBar;
    private ProgressBar steppedBar;

    public ProgressSpinnerView(Context context) : base(context)
    {
        Init(context, null, 0);
    }

    public ProgressSpinnerView(Context context, IAttributeSet attrs) : base(context, attrs)
    {
        Init(context, attrs, 0);
    }

    public ProgressSpinnerView(Context context, IAttributeSet attrs, int defStyleAttr) : base(context, attrs, defStyleAttr)
    {
        Init(context, attrs, defStyleAttr);
    }

    public string Message
    {
        set
        {
            messageView.Text = value;
        }
    }

    public int Max
    {
        set
        {
            steppedBar.Max = value;
        }
    }

    public int Progress
    {
        set
        {
            steppedBar.Progress = value;
        }
    }

    private void Init(Context context, IAttributeSet attrs, int defStyle)
    {
        var view = InflateView(context);
        messageView = FindViewById<TextView>(Resource.Id.progress_bar_message);
        indeterminateBar = FindViewById<ProgressBar>(Resource.Id.indeterminateBar);
        steppedBar = FindViewById<ProgressBar>(Resource.Id.steppedBar);

        LoadAttributes(attrs, defStyle);
    }

    private void LoadAttributes(IAttributeSet attrs, int defStyle)
    {
        var a = Context.ObtainStyledAttributes(attrs, Resource.Styleable.ProgressSpinnerView, defStyle, 0);

        Message = a.GetString(Resource.Styleable.ProgressSpinnerView_message);

        a.Recycle();
    }

    private View InflateView(Context context)
    {
        LayoutInflater inflater = context.GetSystemService(Context.LayoutInflaterService) as LayoutInflater;
        return inflater.Inflate(Resource.Layout.view_progress_spinner, this, true);
    }

    public void SlideDown(bool indeterminateProgress)
    {
        indeterminateBar.Visibility = indeterminateProgress ? ViewStates.Visible : ViewStates.Gone;
        steppedBar.Visibility = indeterminateProgress ? ViewStates.Gone : ViewStates.Visible;
        this.Visibility = ViewStates.Visible;
        var animate = new TranslateAnimation(
            0f,             // fromXDelta
            0f,             // toXDelta
            -this.Height,   // fromYDelta
            0f);            // toYDelta
        animate.Duration = 500;
        ClearAnimation();
        StartAnimation(animate);
    }

    public void SlideUp()
    {
        this.Visibility = ViewStates.Gone;
        var animate = new TranslateAnimation(
            0f,             // fromXDelta
            0f,             // toXDelta
            0f,             // fromYDelta
            -this.Height);  // toYDelta
        animate.Duration = 500;
        ClearAnimation();
        StartAnimation(animate);
    }
}
{% endhighlight %}

### Using the custom view

We need to mark the `message` property as stylable so it can be set in XML. I do this by creating a file called `attrs_progress_spinner_view.xml` in the `values` folder of the resources.

{% highlight XML linenos %}
<?xml version="1.0" encoding="utf-8"?>
<resources>
 <declare-styleable name="ProgressSpinnerView">
  <attr name="message" format="string"/>
 </declare-styleable>
</resources>
{% endhighlight %}

Then to use the custom view we can simply include it in a layout like this

{% highlight XML linenos %}
<PodcastUtilities.AndroidLogic.CustomViews.ProgressSpinnerView
    android:id="@+id/progressBar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:layout_constraintTop_toTopOf="parent"
    android:elevation="2dp"
    android:visibility="gone"
    app:message="@string/finding_podcasts_progress"
    >
</PodcastUtilities.AndroidLogic.CustomViews.ProgressSpinnerView>
{% endhighlight %}

And it looks like this

{% include widgets/image.html src='/images/jekyll/2023-01-01/screen1.png' width='600' height='200' title='Custom View' %}

There is a slight gotcha when using Xamarin Android, [according to stackoverflow][custom-view-url] the XML element name should be the name of the class including the full namespace. Sometimes this needs to be in lower case and sometimes the case needs to match what was specified in  the C# class file. I have not worked out the pattern, if you get an inflation error then try playing with the namespace in the XML element. 

Also using custom views tends to blow up the designer in Visual Studio.


[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[part-3-url]:               /blog/2022/03/27/xamarin-android-part3
[part-4-url]:				        /blog/2022/04/27/xamarin-android-part4
[part-5-url]:				        /blog/2022/06/30/xamarin-android-part5
[part-6-url]:			        	/blog/2022/08/30/xamarin-android-part6
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[ga-url]:                   https://developers.google.com/analytics
[crashlytics-url]:          https://firebase.google.com/products/crashlytics
[crashlytics-setup-url]:    https://firebase.google.com/docs/crashlytics/get-started?platform=android
[wsa-url]:                  https://learn.microsoft.com/en-us/windows/android/wsa/
[fireos-url]:               https://en.wikipedia.org/wiki/Fire_OS
[appcenter-url]:            https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/Xamarin
[appcenter-crashes-url]:    https://learn.microsoft.com/en-us/appcenter/sdk/crashes/android
[appcenter-analytics-url]:  https://learn.microsoft.com/en-us/appcenter/sdk/analytics/android
[firebase-fix-url]:         https://learn.microsoft.com/en-us/answers/questions/450181/android-firebase-crashlytics-build-id-is-missing.html
[appcenter-console-url]:    https://appcenter.ms/apps
[custom-view-url]:          https://stackoverflow.com/questions/17445550/how-to-construct-custom-views-in-xamarin

