<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [

    ];

    public function createdBy()
    {
        $this->belongsTo(User::class);
    }

    public function comments()
    {
        $this->hasMany(CommentsImage::class);
    }

    public function gallery()
    {
        $this->belongsTo(Gallery::class);
    }
}