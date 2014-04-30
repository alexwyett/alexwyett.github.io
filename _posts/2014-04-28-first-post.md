---
layout: post
category : blog
tagline: "First post into the world of blogging"
tags : [intro, beginner, jekyll, tutorial, code]
title: "First Post!"
excerpt: Deciding to take the plunge.
---
{% include JB/setup %}

So...hello! This is my first step into the wonderful world of the blogging so please forgive me if this isn't the most fluent of blog posts.

To be honest, in this post there isn't much for you to see.  This will serve me more than it will you as I'll be testing some of the neat features that [Jekyll](http://jekyllrb.com/), [Github pages](https://pages.github.com/) and [Markdown](https://daringfireball.net/projects/markdown/) provide.

## Style Guide

Code block:

PHP
<code class="prettyprint" lang="php">

/**
 * Foo
 */
class foo() {
    /**
     * Foo - bar
     *
     * @return void
     */
    function bar() {
        return;
    }
}

$foo = new foo();

$foo->bar();
</code>

Javascript
<code class="prettyprint" lang="js">
function foo() {
    this.bar = function() {
        return;
    }
}

var foo = new foo();
foo.bar();
</code>