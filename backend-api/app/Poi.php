<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\CustomID;


class Poi extends Model
{
    use Notifiable;
    use CustomID;
    protected $table = 'poi';


    protected $fillable = [
        'id', 'name', 'longitud', 'latitud', 'description', 'user_id', 'created_at', 'submitter_id'
    ];

    protected $guarded = [
        'submitter_id', 'id'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function location()
    {
        /* Get the location related with this POI*/
        return $this->hasOne('App\Location');
    }

}
