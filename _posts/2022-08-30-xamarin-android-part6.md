---
layout: post
title:  "Xamarin Android Part 6"
date:   2022-08-30 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Xamarin Android for Android Developers

In the [previous post][part-5-url] we completed all the basic tasks building and publishing an app for Android using [Xamarin Android][xamarin-android-url]. There are some other techniques that android developers tend to use that are slightly different when using C#

### Click Handers in Recyclerviews

In kotlin you will often see click handlers attached to `RecyclerView` items by using `setOnClickListener` like this

{% highlight kotlin linenos %}
override fun onBindViewHolder(holder: RecyclerViewHolder, position: Int) {
  val id = presenter.getTrackId(position)
  val label = presenter.getTrackLabel(position)
  val sublabel = presenter.getTrackSubLabel(position)
  holder.bind(label, sublabel)
  holder.rowLabelContainer.setOnClickListener {
    presenter.trackSelected(id, position)
  }
}

override fun trackSelected(trackId: Long, position: Int) {
    if (trackId < 0) {
        return
    }
    if (inMultiSelectMode) {
        toggleSelection(position)
    } else {
        view?.navigateToTrack(trackId)
    }
}
{% endhighlight %}

Although you can (and possibly should) call `setOnClickListener(null)` to deregister the event handler most examples dont do this.

There are Xamarin.Android wrappers that mean I could just call `setOnClickListener` however while putting together the rest of the app I had decided I preferred to use [C# EventHandlers](/blog/2022/03/27/xamarin-android-part3#c-eventhandlers) so I needed a mechanism to use them, in C# I wrote this

{% highlight C# linenos %}
public override void OnBindViewHolder(RecyclerView.ViewHolder holder, int position)
{
  RecyclerViewHolder vh = holder as RecyclerViewHolder;
  // unsubscribe if it was subscribed before
  vh.Container.Click -= Container_Click;

  vh.Label.Text = ViewModel.GetLabelForListItem(Items[position]);
  vh.CheckBox.Checked = Items[position].Selected;

  vh.Container.Tag = position.ToString();
  vh.Container.Click += Container_Click;
}

private void Container_Click(object sender, EventArgs e)
{
  int position = Convert.ToInt32(((View)sender).Tag.ToString());
  Items[position].Selected = !Items[position].Selected;
  NotifyItemChanged(position);
  ViewModel.SelectionChanged(position);
}

class RecyclerViewHolder : RecyclerView.ViewHolder
{
  public View Container { get; private set; }
  public TextView Label { get; private set; }
  public AppCompatCheckBox CheckBox { get; private set; }

  public RecyclerViewHolder(View itemView) : base(itemView)
  {
    Container = itemView.FindViewById<View>(Resource.Id.purge_row_label_container);
    Label = itemView.FindViewById<TextView>(Resource.Id.purge_row_label);
    CheckBox = itemView.FindViewById<AppCompatCheckBox>(Resource.Id.purge_row_check);
  }
}

{% endhighlight %}

The `ViewHolder.Container` is just a simple Android `View` and I wanted to use its `Click` C# EventHandler, I would use standard C# `+=` and `-=` syntax to add and remove the handler.

Inside the event handler `Container_Click` I needed to be able to find the id of the item that was being represented. To do this I just set the `Tag` property on the `ViewHolder.Container` to be the position in the list and then in the evnt handler I could read the `Tag` property and convert it back into the position


[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[part-3-url]:               /blog/2022/03/27/xamarin-android-part3
[part-4-url]:				        /blog/2022/04/27/xamarin-android-part4
[part-5-url]:				/blog/2022/06/30/xamarin-android-part5
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
