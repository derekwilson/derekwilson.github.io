---
layout: post
title:  "Navigation widgets for liquid"
date:   2017-06-28 20:38:47 +1300
published: true
tags: ["Development", "General", "Web"]
categories: ["Development", "General", "Web"]
---

Now my blog is hosted on [Github Pages][github-pages-url] using [Jekyll][jekyll-url] I found that I need to make some additions to the default template. I used the default template as it has a pretty well structured set of includes meaning that I can add my own widgets pretty easily.

The last main piece that I wanted to add from my previous blog was navigation controls. I wanted a timeline of blog posts as well as navigation by categories.

The common mechanism for doing this is to use a [Jekyll plugin][jekyll-plugins-url]. However I am hosted on Github Pages and this environment only supports a [whitelist group][github-pages-plugins-url] of plugins.

The timeline navigation on the home page proved to be quite easy, in the sense that I found this [great example][timeline-url] that [Sebastian Teumert][timeline-author-url] has produced. Its not only a great widget but it he also produces a tool kit and although I dont use the tool kit the way he explained how he wrote the widget really helped me get going writing my own [Liquid][liquid-url] template widget.

I ended up pretty much using it "as is", with the exception of having to tweak the urls for my blog. On the home page I just provide an indented list of years and months, for each month that has a post. The links point through to the archive page.

```html
{% raw  %}
{% comment %}
	Posting time line.
	
	Author: Sebastian Teumert (<http://www.teumert.net>, <http://www.github.com/NetzwergX>)
	Licensed under the MIT license (see LICENSE file).
	
	This widget displays a time line with month in which posts were written, grouped by year.	
	
	For more Jekyll widgets, see <http://www.github.com/NetzwergX/jekyll-template-toolkit>.
{% endcomment %}	
<section>
	<nav>
		<h1>Timeline</h1>
		<ul class="postList archive">
		{% for post in site.posts %}
		
			{% if post.next %}		
					{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
					{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
					{% capture month %}{{ post.date | date: '%B' }}{% endcapture %}
					{% capture nmonth %}{{ post.next.date | date: '%B' }}{% endcapture %}
			{% endif %}
			
			{% if forloop.first %}				
					<!-- year -->
					<li><a href="/blog/archive.html#{{ post.date | date: '%Y' }}">{{ post.date | date: '%Y' }}</a>				
						<ul>
							<!-- month -->
							<li><a href="/blog/archive.html#{{ post.date | date: '%Y-%B' }}">{{ post.date | date: '%B' }}</a>							
								<ul>			
			{% else %}
				<!-- all other posts -->								
					{% if year != nyear %}	
								</ul>
							</li>						
							<!-- /month -->	
						</ul>
					</li>
					<!-- /year -->
					<!-- year -->
					<li><a href="/blog/archive.html#{{ post.date | date: '%Y' }}">{{ post.date | date: '%Y' }}</a>				
						<ul>
							<!-- month -->
							<li><a href="/blog/archive.html#{{ post.date | date: '%Y-%B' }}">{{ post.date | date: '%B' }}</a>							
								<ul>		
					{% elsif month != nmonth %}
								</ul>
							</li>						
							<!-- /month -->	
							<!-- month -->
							<li><a href="/blog/archive.html#{{ post.date | date: '%Y-%B' }}">{{ post.date | date: '%B' }}</a>							
								<ul>												
					{% endif %}					
		   {% endif %}	
		   {% comment %}<li><a href="/{{ post.url }}">{{ post.title }}</a></li>	{% endcomment %}
		   
		   {% if forloop.last %}
		  						 </ul>
							</li>						
							<!-- /month -->	
						</ul>
					</li>
					<!-- /year -->		
		   {% endif %}		   		   		
		{% endfor %}														
		</ul>		
	</nav>
</section>
{% endraw  %}
```
The [archive page][timeline-nav-url] is very similar, except that inside each month I list all the blog titles and the links go to the post.

```html
{% raw  %}
---
layout: page
title: Archive
---
<section>		
		<ul class="postList archive">
		{% for post in site.posts %}
		
			{% if post.next %}		
					{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
					{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
					{% capture month %}{{ post.date | date: '%B' }}{% endcapture %}
					{% capture nmonth %}{{ post.next.date | date: '%B' }}{% endcapture %}
			{% endif %}
			
			{% if forloop.first %}				
					<!-- year -->
					<li class="box"><h3 id="{{ post.date | date: '%Y' }}">{{ post.date | date: '%Y' }}</h3>			
						<ul>
							<!-- month -->
							<li><h4 id="{{ post.date | date: '%Y-%B' }}">{{ post.date | date: '%B' }}</h4>				
								<ul>			
			{% else %}
				<!-- all other posts -->								
					{% if year != nyear %}	
								</ul>
							</li>						
							<!-- /month -->	
						</ul>
					</li>
					<!-- /year -->
					<!-- year -->
					<li class="box"><h3 id="{{ post.date | date: '%Y' }}">{{ post.date | date: '%Y' }}</h3>		
						<ul>
							<!-- month -->
							<li><h4 id="{{ post.date | date: '%Y-%B' }}">{{ post.date | date: '%B' }}</h4>						
								<ul>		
					{% elsif month != nmonth %}
								</ul>
							</li>						
							<!-- /month -->	
							<!-- month -->
							<li><h4 id="{{ post.date | date: '%Y-%B' }}">{{ post.date | date: '%B' }}</h4>						
								<ul>												
					{% endif %}					
		   {% endif %}	
		   <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
		   
		   {% if forloop.last %}
		  						 </ul>
							</li>						
							<!-- /month -->	
						</ul>
					</li>
					<!-- /year -->		
		   {% endif %}		   		   		
		{% endfor %}														
		</ul>		
</section>
{% endraw  %}
```

The category navigation on the home page was a little more complex. I did also manage to find another [example][category-url]. However it didn't do quite what I wanted so I ended up rewriting it to be what I wanted. This was mainly around unifying the case of the categories so that I could sort them as I wanted to display the categories in alphabetical order. 

This widget give a navigation list with the number of items in that category, the links point through to the actual category page.

```html
{% raw  %}
<section>
	<nav>
		<h1>Categories</h1>
        <ul class="tag-box inline">
            {% assign tags_list = site.categories | sort {|left, right| left[0] <=> right[0]} %}
            {% if tags_list.first[0] == null %}
                {% for tag in tags_list %} 
                <li><a href="categories#{{ tag }}">{{ tag | capitalize }}</a> <span>({{ site.tags[tag].size }})</span></li>
                {% endfor %}
            {% else %}
                {% for tag in tags_list %} 
                <li><a href="categories#{{ tag[0] }}">{{ tag[0] | capitalize }}</a> <span>({{ tag[1].size }})</span></li>
                {% endfor %}
            {% endif %}
            {% assign tags_list = nil %}
        </ul>
	</nav>
</section>
{% endraw  %}
```

Then the actual [category page][category-nav-url] looks like this, it repeats the navigator and then the rest of the page groups links to each post under each category.

```html
{% raw  %}
---
layout: page
title: Categories
---
<section id="archive">
        <h3>All posts by category</h3>
        <ul class="tag-box inline">
            {% assign tags_list = site.categories | sort {|left, right| left[0] <=> right[0]} %}
            {% if tags_list.first[0] == null %}
                {% for tag in tags_list %} 
                <li><a href="#{{ tag }}"><strong>{{ tag | capitalize }}</strong></a> <span>({{ site.tags[tag].size }})</span></li>
                {% endfor %}
            {% else %}
                {% for tag in tags_list %} 
                <li><a href="#{{ tag[0] }}"><strong>{{ tag[0] | capitalize }}</strong></a> <span>({{ tag[1].size }})</span></li>
                {% endfor %}
            {% endif %}
            </ul>
        
            {% for tag in tags_list %} 
            <h4 id="{{ tag[0] }}">{{ tag[0] | capitalize }}</h4>
            <ul class="">
                {% assign pages_list = tag[1] %}  
                    {% for post in pages_list %}
                    {% if post.title != null %}
                        {% if group == null or group == post.group %}
                        <li><a href="{{ post.url }}"><strong>{{ post.title }}</strong><span class="entry-date"></a><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished"> - {{ post.date | date: "%B %d, %Y" }}</time></li>
                        {% endif %}
                    {% endif %}
                    {% endfor %}
                {% assign pages_list = nil %}
                {% assign group = nil %}
            </ul>
            {% endfor %}
</section>
{% endraw  %}
```

[github-pages-url]:			https://pages.github.com
[github-pages-plugins-url]: https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/
[liquid-url]:				https://jekyllrb.com/docs/templates/
[jekyll-url]:				https://jekyllrb.com
[jekyll-plugins-url]:		https://jekyllrb.com/docs/plugins/
[timeline-url]:				https://github.com/NetzwergX/netzwergx.github.io/blob/master/_posts/en/2012-08-29-group-posts-by-month-and-year-jekyll.md
[timeline-author-url]:		https://github.com/NetzwergX
[category-url]:				http://www.minddust.com/post/alternative-tags-and-categories-on-github-pages/
[timeline-nav-url]:			/blog/archive
[category-nav-url]:			/blog/categories

