---
layout: tags
title: 标签
description: 哈哈，你找到了我的文章基因库
comments: false
permalink: /tags/
less: [pages/tags.less]
---

<article class="tag-bd-wrap">
{% assign tags = site.tags  %}
{% for tag in tags %}
    <h3 id="{{tag|first}}" class="tag-item-hd"> {{ tag | first }} ({{ tag.last | size }})</h3>
    <ol class="tag-item-bd" id="{{ tag|first }}" data-count="{{ tag.last | size }}">
    {% for post in tag.last %}
        <li class="tag-item-bd-posts">
            <div class="flexable">
                <a class="posts-list-name" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
                <span class="flex-auto"></span>
                <span class="posts-list-meta">{{ post.date | date:"%b %d, %Y" }}</span>
            </div>
        </li>
    {% endfor %}
    </ol>
{% endfor %}
</article>

<!-- /section.content -->
