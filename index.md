---
layout: list
title: Home
tagline: Yet another developer blog
navigation: true
order: 1
---

<div>
    {% for post in site.posts limit:5 %}
        {% include post.html %}
    {% endfor %}
</div>