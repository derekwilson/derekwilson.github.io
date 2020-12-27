---
layout: post
title:  "Reverting a merged branch in GIT"
date:   2020-12-27 12:00:00
published: true
tags: ["General", "Development"]
categories: ["General", "Development"]
---

Recently I needed to fix a problem we had with our code base. The problem was that we had changed some code in one of our internal libraries and tested and merged it. However our internal consumers of the library were not ready to accept our changes and as they had been merged into master it was blocking further work on the library. In truth we should not have merged the change but a communication breakdown meant I now had an interesting problem to fix.

Initially I thought it would be simple as I had reverted bad commits in the past, however this was different - there were a large number of commits in the merge and they were not actually bad, we did need to be able to merge the code at a later date.

I tried reverting the commit in SourceTree but got this error

```
git --no-optional-locks revert --no-edit 030693fb2bda8a6de871376eddf17fb291ca64e4 
error: commit 030693fb2bda8a6de871376eddf17fb291ca64e4 is a merge but no -m option was given.
fatal: revert failed
```

At this point I began to wonder if it might not be as straightforward as I thought. I found an [article written by Linus][linus-article-url].

As the error message and the article suggest the command I need is

```
git --no-optional-locks revert -m 1 --no-edit 030693fb2bda8a6de871376eddf17fb291ca64e4 
```

However the added complexity comes in when we try and merge the commits in later. As they have already been merged and reverted from the master branch they will not be included in a future merge.

So after doing the `revert -m 1` command above and made sure that master no longer had the commits from the merge. The steps I needed were

1. branch from the main branch
1. revert the revert (get my code back)
1. wait until the time is right to merge, and also do any fixing that I wanted
1. merge as usual

So it was a bit more complex than I was prepared for but I got there in the end.

[linus-article-url]:        https://github.com/git/git/blob/master/Documentation/howto/revert-a-faulty-merge.txt

