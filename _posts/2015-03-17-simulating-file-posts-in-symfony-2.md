---
layout: post
category : blog
tagline: ""
tags : [symfony,php,oo,unit-testing]
title: "Simulating posting a file to a controller in Symfony2"
excerpt: Adding file upload data into a unit test.
---

A lot of my <a href="http://www.originalcottages.co.uk" rel="nofollow">work</a> consists of building and maintaining a <a href="http://en.wikipedia.org/wiki/Representational_state_transfer" rel="nofollow">restful api</a>.  An important aspect of this is writing unit tests which help enforce consistency across our ever expanding codebase.

One unit test that needed to be implemented was testing a route which allowed a file upload.  Since there isn't a way to post a form, the test needed to simluate the file upload using another method.  Fortunately, this is were Symfony's <a href="http://api.symfony.com/2.3/Symfony/Component/HttpFoundation/File/UploadedFile.html" rel="nofollow">UploadedFile</a> object is useful.

The gist below is a quick example of what was required to test the controller endpoint.  Feel free to make any suggestions or improvements.

<script src="https://gist.github.com/alexwyett/7babe88fbd09b0cb72bb.js"></script>
