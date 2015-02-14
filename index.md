---
layout: list
title: Home
tagline: Yet another developer blog
---
{% include JB/setup %}

<div>
    {% for post in site.posts limit:5 %}
        <article class="post teaser">
            <h3 class="title">
                {{ post.title }}
                <small>
                    {{ post.date | date_to_string }}

                    {% if post.tags.size > 0 %}
                        <span class="tags">
                            {% for tag in post.tags %}
                                <span>{{ tag }}</span>
                            {% endfor %}
                        </span>
                    {% endif %}
                </small>
            </h3>
            <p>
                {{ post.excerpt | strip_html }}
            </p>
            <p class="cta">
                <a href="{{ BASE_PATH }}{{ post.url }}">Read Post &raquo;</a>
                {% if page.demolink %}<a href="{{ page.demolink }}#disqus_thread">View Demo &raquo;</a>{% endif %}
            </p>
        </article>
    {% endfor %}
</div>