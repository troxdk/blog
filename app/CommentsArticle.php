<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentsArticle extends Model
{
    protected $guarded = [

    ];

    public function createdBy()
    {
        if ($this->belongsTo(User::class) != null) {
            return $this->belongsTo(User::class);
        } else {
            return $this->name;
        }
    }
}