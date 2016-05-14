<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class MapController extends Controller
{
    public function index()
    {
        return view('map.show');
    }

    public function getPositions()
    {
        $positions = DB::table('positions')->get();

        $positions = array_map(function($item){
            return [(float)$item->lat, (float)$item->long];
        }, $positions);

        return response()->json($positions);
    }
}
