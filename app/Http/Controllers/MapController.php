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

    public function getPositions($latest = 0)
    {
        $data = ['latest' => 0, 'positions' => []];
        //$latest = 0;
        /*if($request->has('latest')) {
            $latest = $request->input('latest');
        }*/
        $positions = DB::table('positions')
            ->where('timestamp', '>', $latest)
            ->where('is_gps', 1)
            ->orderBy('timestamp', 'asc')
            ->get();

        
        if(count($positions)) {
            $data['latest'] = end($positions)->timestamp;
            
            reset($positions);
            $data['positions'] = array_map(function($item){
                return [(float)$item->long, (float)$item->lat];
            }, $positions);
        }

        return response()->json($data);
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
