<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Gallery;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home', ['subTitle' => 'Turen går Fyn rundt', 'headerImg' => 'img/boats.jpg']);
    }

    public function galleries()
    {
        return view('gallery.index');
    }

    public function gallery(Gallery $gallery)
    {
        dd($gallery);
    }

    public function articles()
    {
        return view('article.index');
    }

    public function article(Article $article)
    {
        dd($article);
    }
}
