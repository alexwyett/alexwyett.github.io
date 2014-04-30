---
layout: page
title: The Alex Wyett Blog
tagline: 
---
{% include JB/setup %}

<section class="posts">
    {% for post in site.posts %}
        <article class="post teaser">
            <h3>{{ post.title }}<span>{{ post.date | date_to_string }}</span></h3>
            <p>{{ post.excerpt | strip_html }}</p>
            <p class="cta">
                <a href="{{ BASE_PATH }}{{ post.url }}">Read Post &raquo;</a>
                {% if page.demolink %}<a href="{{ page.demolink }}">View Demo &raquo;</a>{% endif %}
            </p>
        </article>
    {% endfor %}
</section>