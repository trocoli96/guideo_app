<?php


namespace App\Http\Controllers;

use App\Contracts\Pois\PoiHandler;
use App\Location;
use App\User;
use App\Poi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use App\Http\Controllers\Traits\ApiResponses;

class PoiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createPoi(Request $request){

        $data = $request->all();

        $userId = Auth::id();

        $lng = $data['lng'];
        $lat = $data['lat'];
        $radius = 0.2; // Km

        // Every lat|lon degree° is ~ 111Km
        $angle_radius = $radius / ( 111 * cos( $lng ) );

        $max_lat = $lat - $angle_radius;
        $min_lat = $lat + $angle_radius;
        $max_lng = $lng - $angle_radius;
        $min_lng = $lng + $angle_radius;

        $possibleexistinglocation = DB::table("poi")
        ->whereBetween('lng', [$min_lng, $max_lng])
        ->whereBetween('lat', [$min_lat, $max_lat])
        ->get();

        $numberofexistinglocation = sizeof($possibleexistinglocation);

        if($numberofexistinglocation > 0) {
            return response()->json('You cannot place a POI near another location', 400);
        }

        $createdPoi = Poi::create([
            'id' => $poiGeneratedId = Poi::generateID(),
            'submitter_id' => $userId,
            'lng' => $lng,
            'lat' => $lat,
            'language' => $request ['language'],
            'name' => $request['name'],
            'description' => $request['description']
        ]);

       return response()->json($createdPoi,200);
    }

    public function getLocations(Request $request){

        $data = $request->all();

        $lon = $data['lng'];
        $lat = $data['lat'];
        $radius = 50; // Km

        // Every lat|lon degree° is ~ 111Km
        $angle_radius = $radius / ( 111 * cos( $lon ) );

        $max_lat = $lat - $angle_radius;
        $min_lat = $lat + $angle_radius;
        $max_lon = $lon - $angle_radius;
        $min_lon = $lon + $angle_radius;

        $locations = DB::table("poi")
            ->whereBetween('lng', [$min_lon, $max_lon])
            ->whereBetween('lat', [$min_lat, $max_lat])
            ->get();

        return response()->json($locations,200);

    }

    public function getPoiById(Request $request, $id){

        $poi = DB::table("poi")
        ->where('id', "=", $id)
        ->get();

        return response()->json($poi,200);

    }

}
