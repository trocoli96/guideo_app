<?php


namespace App\Http\Controllers\Traits;

use Illuminate\Http\Response;

trait ApiResponses
{
    /**
     * Build success response
     * @param  string|array $data
     * @param  int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function successResponse($data, $code = Response::HTTP_OK)
    {
        return response()->json(['data' => $data], $code);
    }

    public function successCollectionResponse($collection)
    {
        $response = [
            'collection' => $collection,
            'total' => $collection->count(),
        ];

        return $this->successResponse($response);
    }

    /**
     * Build error responses
     * @param  string|array $message
     * @param  int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function errorResponse($message, $code)
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }
}
