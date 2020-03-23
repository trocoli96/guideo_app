<?php


namespace App\Services\Pois;

use App\Contracts\Pois\PoiHandler as Handler;
use App\Poi;
use Illuminate\Support\Facades\DB;

class PoiHandler implements Handler
{
    public function checkForDuplicates($longitud, $latitud) : Int
    {
        $possibleexistinglocation = DB::table('poi')
            ->where('longitud','=', $longitud)
            ->where('latitud','=', $latitud)
            ->get();

        return sizeof($possibleexistinglocation);
    }

}
