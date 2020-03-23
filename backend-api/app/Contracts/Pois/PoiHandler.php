<?php


namespace App\Contracts\Pois;


use App\Poi;

interface PoiHandler
{
    public function checkForDuplicates($longitud, $latitud) : Int;
}
