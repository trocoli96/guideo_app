<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\CustomID;


class Location extends Model
{
    use Notifiable;
    use CustomID;
    protected $table = 'location';


    protected $fillable = [
        'id','longitude', 'latitude', 'author_id', 'created_at'
    ];

    protected $guarded = [
        'author_id', 'id'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function poi()
    {
        /* Get the location related with this POI*/
        return $this->belongsTo('App\Poi');
    }

}
