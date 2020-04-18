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

        $possibleexistinglocation = DB::table('location')
            ->where('longitude','=', $data['longitude'])
            ->where('latitude','=', $data['latitude'])
            ->get();

        $numberofexistinglocation = sizeof($possibleexistinglocation);

        if($numberofexistinglocation > 0) {
            return response()->json('You cannot place a POI in the same location', 400);
        }

        $createdPoi = Poi::create([
            'id' => $poiGeneratedId = Poi::generateID(),
            'submitter_id' => $userId,
            'name' => $request['name'],
            'description' => $request['description']
        ]);

        $locationRequest = [
            'poi_id' => $poiGeneratedId,
            'longitude' => $request['longitude'],
            'latitude' => $request['latitude'],
            'name' => $createdPoi['name']
        ];

       return $this->createLocation($locationRequest);
    }

    public function createLocation($locationRequest){

        $userId = Auth::id();

        $createdLocation = new Location;
        $createdLocation->id = $locationGeneratedId = Location::generateID();
        $createdLocation->longitude = $locationRequest['longitude'];
        $createdLocation->latitude = $locationRequest['latitude'];
        $createdLocation->author_id = $userId;
        $createdLocation->poi_id = $locationRequest['poi_id'];

        $createdLocation->save();

        return response()->json($createdLocation, 200);
    }

    public function getLocations(Request $request){

        $data = $request->all();

        $lon = $data['longitude'];
        $lat = $data['latitude'];
        $radius = 20; // Km

        // Every lat|lon degree° is ~ 111Km
        $angle_radius = $radius / ( 111 * cos( $lat ) );

        $min_lat = $lat - $angle_radius;
        $max_lat = $lat + $angle_radius;
        $min_lon = $lon - $angle_radius;
        $max_lon = $lon + $angle_radius;

        $locations = DB::table("location")
            ->whereBetween('longitude', [$min_lon, $max_lon])
            ->whereBetween('latitude', [$min_lat, $max_lat])
            ->get();

        return response()->json([$min_lat,$max_lat,$min_lon,$max_lon],200);

    }

    public function getPoiById(Request $request, $id){
  
        $poi = DB::table("poi")
        ->where('id', "=", $id)
        ->get();

        return response()->json($poi,200);

    }

}
