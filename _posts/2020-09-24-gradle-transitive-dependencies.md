---
layout: post
title:  "Managing transitive dependencies in gradle"
date:   2020-09-24 12:00:00
published: true
tags: ["Android", "Development", "Development"]
categories: ["Android", "Development", "Development"]
---

Recently I can across a problem with android dependencies when upgrading some of our components. The problem was that the library `org.apache.commons:commons-lang3` [broke compatibility with Android version 6 and earlier.][apache-error-url] The issue was introduced in the commons-lang3 library at version 3.10, if we used version 3.9 or earlier we were fine anything later and it would fail.

I did some experimentation and found that I was able to control my project dependencies using gradle. At its simplist I could change the reference from this

```
implementation "org.apache.commons:commons-lang3:3.9"
```

to this

```
implementation ("org.apache.commons:commons-lang3") {
    version {
        strictly "3.9"
    }
    because "new versions of apache commons dont work with android v6 - sdk23 - see https://issues.apache.org/jira/browse/LANG-1532"
}
```

Now whenever any of my dependent libraries tries to use a newer version of `org.apache.commons:commons-lang3` then an error would be thrown. I think its a good idea to specify a good `because` clause as in a team of developers you need to be clear for the reason to restrict the specified version.

```
Cannot find a version of 'org.apache.commons:commons-lang3' that satisfies the version constraints:
   Dependency path 'app:unspecified' --> 'com.example:dependent-library:1.2.3' --> 'org.apache.commons:commons-lang3:3.10'
   Dependency path 'app:unspecified' --> 'com.example:app:unspecified' --> 'org.apache.commons:commons-lang3:{strictly 3.9}' because of the following reason: new versions of apache commons dont work with android v6 - sdk23 - see https://issues.apache.org/jira/browse/LANG-1532
```

In this example my app is using a `dependent-library` and version 1.2.3 of that library has a reference to `org.apache.commons:commons-lang3:3.10`

This is obviously a problem, but at least it is visible, Gradle's default behaviour is to silently upgrade everyone to 3.10 which is not ideal. In my case none of my dependencies tripped this error. If they had then there are a number of options for solving the problem. If I had access to the source of `dependent-library` then maybe I could change its dependency, or alternatively I could use an earlier version of `dependent-library`, or remove the library completely.

If none of these can be used then another, though potentially dangerous solution is to override Gradle's default behaviour by doing this in the top level `build.gradle` file

```
allprojects {
    configurations.all {
        resolutionStrategy {
            dependencySubstitution {
                substitute(module("org.apache.commons:commons-lang3")).with(module("org.apache.commons:commons-lang3:3.9"))
            }
        }
    }
```

Dont forget this is potentially very dangerous as `dependent-library` will now be forced to use version 3.9 even though it wanted 3.10 and it has probably never been tested in this configuration. Also this substitution will fail if the library has also specified a `strictly` reference

[apache-error-url]:			https://issues.apache.org/jira/browse/LANG-1532


