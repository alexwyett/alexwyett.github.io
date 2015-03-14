---
layout: post
category : blog
tagline: "The table-layout property"
tags : [css]
title: "The table-layout property"
excerpt: Exporing the table-layout property in css.
---

At <a href="http://www.originalcottages.co.uk" rel="nofollow">work</a>, I'm occasionally asked to host some seminars on web technology for our marketing department.  The latest of which will be a primer on HTML, CSS and a brief introduction to responsive web applications.

When doing a bit of research on responsive layouts, I came across the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout" rel="nofollow">table-layout</a> css property.  Something that always bothered me with html tables was the default layout behavior, the width of the columns is never consistent and becomes problematic with long pieces of information.

## table-layout: fixed;

The table-layout:fixed; property solves this problem by:

<blockquote>
Table and column widths are set by the widths of table and col elements or by the width of the first row of cells. Cells in subsequent rows do not affect column widths.
</blockquote>

This means that you have much more finite control of the data in your table.  Combining it with a css ellipsis you can get some neat results. See pen below. 

<p data-height="225" data-theme-id="0" data-slug-hash="bNQbYy" data-default-tab="result" data-user="alexwyett" class='codepen'>See the Pen <a href='http://codepen.io/alexwyett/pen/bNQbYy/'>bNQbYy</a> by Alex Wyett (<a href='http://codepen.io/alexwyett'>@alexwyett</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
