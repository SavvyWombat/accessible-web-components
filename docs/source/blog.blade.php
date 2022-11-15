---
title: Blog
---

@extends('_layouts.default')

@section('content')
  <section>
    <h1>Blog</h1>
  </section>

  <section>
    <ul class="list-none gap-12">
      @foreach ($blog as $post)
        <li class="flex flex-col">
          <a href="{{ $post->getPath() }}">{{$post->category}}: {{ $post->title }}</a>
          <span>{{ date("F j, Y", $post->date) }}</span>
          <span>{{ $post->description }}</span>
        </li>
      @endforeach
    </ul>
  </section>
@endsection