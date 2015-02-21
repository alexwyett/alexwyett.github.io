---
layout: list
title: Home
tagline: Yet another developer blog
---
{% include JB/setup %}

<div>
    {% for post in site.posts limit:5 %}
        {% include post.html %}
    {% endfor %}
</div>