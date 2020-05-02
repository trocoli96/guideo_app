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
        'id', 'name', 'lng', 'lat', 'language', 'description', 'user_id', 'created_at', 'submitter_id'
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


}
