<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    $data['deneme'] = "123**123";
    $data['num'] = 100;

    return Inertia::render('Home',[
        'data'=> $data
    ]);
});
