<?php

return [
    'production' => false,
    'baseUrl' => 'https://localhost:3000/',
    'description' => 'A free and open source library of Web Components built for accessibility and stylability.',
    'collections' => [
        'blog' => [
            'path' => 'blog/{date|Y-m-d}/{-title}',
            'sort' => '-date',
        ],
    ],
];
