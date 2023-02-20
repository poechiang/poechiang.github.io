---
layout: category
title: 分类
description: 哈哈，你找到了我的文章基因库
less: [pages/category.less]
comments: false
permalink: /categories/
---

<article class="category-bd-wrap">
{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
<div class="flexable">
    <h3 id="{{category|first}}" class="category-item-hd">{{ category | first }} </h3>
</div>
<ol class="category-item-bd" id="{{ category|first }}" data-count="{{ category.last | size }}">
    {% for post in category.last %}
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
