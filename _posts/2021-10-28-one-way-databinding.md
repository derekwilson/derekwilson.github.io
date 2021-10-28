---
layout: post
title:  "One-way databinding in Android"
date:   2021-10-28 12:00:00
published: true
tags: ["Android", "Development"]
categories: ["Android", "Development"]
---

Recently I was trying to fix an odd error in screen rotation. There were two input fields and one was preserved when the screen was rotated and the other was not.

The databinding is setup at the top of the layout XML file like this

{% highlight Xml linenos %}
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>
        <variable
            name="viewModel"
            type="com.example.namespace.ViewModel" />
    </data>
{% endhighlight %}

The field that works correctly looks like this

{% highlight Xml linenos %}
<EditText
    android:id="@+id/txt1"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:enabled="@{viewModel.txt1Editable}"
    android:text="@={viewModel.txt1String}"
    android:theme="@style/EditTextTheme"
    android:visibility="@{!viewModel.txt1Visible}"
    />
{% endhighlight %}

The field that dies not work properly looks like this

{% highlight Xml linenos %}
<EditText
    android:id="@+id/txt2"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@{viewModel.txt2String}"
    android:theme="@style/EditTextTheme"
    android:visibility="@{!viewModel.txt2Visible}"
    />
{% endhighlight %}

In reality the declarations were a lot more verbose than this, I've simplified them to make it easier to see.

In the `ViewModel` class the bound variables look like this

{% highlight Kotlin %}
val txt1Visible = ObservableBoolean()
val txt1Editable = ObservableBoolean()
val txt1String = ObservableField<String>()
val txt2Visible = ObservableBoolean()
val txt2String = ObservableField<SpannableString>()
{% endhighlight %}

When the screen was rotated then the `txt1` field correctly kept its value whereas `txt2` was cleared. The clue was in the obvious difference that `txt2` was bound to a `SpannableString`. I stared at this code for a while before I spotted the problem and I do wonder why we do this to ourselves. 

### Why do we do this to ourselves?

I think everyone who started writing code in C can remember the pain that was caused by a missing `=` in this line of code

{% highlight C %}
if (index = 0) {
    doStuff();
}
{% endhighlight %}

If its been a while since you saw this then the effect in C is that `index` is assigned the value of zero and, as zero is `false`, then `doStuff()` is never called. Almost certainly not what you intended. This became so much of an issue that C derivatives such as `Java ` and `C#` mark the statement as an error or warning, by stopping the automatic cast of an int to a boolean.

### One gap plugged another opens.

In the databinding example here, the reason that I was seeing the odd behaviour was because the binding was [one-way][android-2way-databinding-url]. Like the name suggests one-way binding only allows data to be pushed from the variable `txt2String` into the UI control, to get the data back we need to access the `Text` property of the `EditText`. So when we rotate the screen for all [two-way][android-2way-databinding-url] data bound controls the OS appears to persist the current values, for anything not bound or one-way bound it just silently discards the value. I guess I don't have a problem with that behaviour but I do have a problem with the syntax. Like the old C `=` problem we seem to have invented a syntax that does its best to create problems.

One-way binding looks like this

{% highlight Xml %}
    android:text="@{viewModel.txt2String}"
{% endhighlight %}

Two-way binding like this

{% highlight Xml %}
    android:text="@={viewModel.txt1String}"
{% endhighlight %}

In a wall of text the missing `=` is hard to spot.

### Fixing the issue

I did think all I had to do was make the binding two-way but that didn't work, I get this error

```
Cannot find a getter for <EditText android:text> that accepts parameter type 'androidx.databinding.ObservableField<android.text.SpannableString>'
```

That does make sense, it does not know how to produce a `SpannableString` from text.

In the end I had to save the current text by getting the current value from the control and saving the state like this

{% highlight Kotlin linenos %}
override fun onSaveInstanceState(outState: Bundle) {
    // the message binding is one way so we need to save the state ourselves
    outState.putString(KEY_MESSAGE_TEXT, binding.txt2.text.toString())
    super.onSaveInstanceState(outState)
}
{% endhighlight %}

And then set it when the UI is initialised when the screen is recreated.

{% highlight Kotlin linenos %}
savedInstanceState?.getString(KEY_MESSAGE_TEXT)?.let {
    txt2String.set(spannableProvider.createSpannableString(it))
}
{% endhighlight %}


[android-2way-databinding-url]:		https://developer.android.com/topic/libraries/data-binding/two-way


