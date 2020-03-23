<?php


namespace App\Providers;

use App\Services\Pois\PoiHandler;
use Illuminate\Support\ServiceProvider;

class BindingServiceProvider extends ServiceProvider
{
    protected $services = [
        \App\Contracts\Pois\PoiHandler::class => PoiHandler::class,
    ];

    public function boot() {

    }

    public function register()
    {
        foreach ($this->services as $contract => $implementation) {
            $this->app->bind($contract, $implementation);
        }
    }
}
