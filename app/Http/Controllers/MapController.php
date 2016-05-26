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
        $positions = DB::table('positions')->where('is_gps', 1)->orderBy('timestamp', 'asc')->get();

        $positions = array_map(function($item){
            return [(float)$item->long, (float)$item->lat];
        }, $positions);

        return response()->json($positions);
    }

    public function addPosition(Request $request)
    {
        DB::table('positions')->insert([
            'lat' => $request->input('lat'),
            'long' => $request->input('longitude'),
            'timestamp' => strtotime($request->input('time')),
            'is_gps' => ($request->input('provider') == 'gps' ? 1 : 0)
        ]);
    }
}
