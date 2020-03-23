<?php


namespace App;

trait CustomID
{
    public static function generateID() {
        try {
            $permitted_chars = '0123456789';

            $candidateID = substr(str_shuffle($permitted_chars), 0, 9);
            // call the same function if the id exists already
            if (parent::idExist($candidateID)) {
                return parent::generateID();
            }
            // otherwise, it's valid and can be used
            return $candidateID;
        } catch (\Exception $e) {
            return null;
        }
    }

    public static function idExist($id) {
        // query the database and return a boolean
        // for instance, it might look like this in Laravel
        try {
            parent::findOrFail($id);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
