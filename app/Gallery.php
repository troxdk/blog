<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $guarded = [

    ];

    public function images()
    {
        $this->hasMany(Image::class);
    }

    public function createdBy()
    {
        $this->belongsTo(User::class);
    }
}