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

        // we ensure that the user from the token exists
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);

        if ($userIdDoesExist === null) {
            return response()->json("User doesn't exist",400 );
        }

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

}
