<?php

namespace App\Http\Controllers;

use App\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class LessonController extends Controller
{
    /**
     * The required fields. Used by Controller Action's Validate function ($rule argument).
     *
     * @var array
     */
    private $requiredFieldSet = [
        'name' => 'required|max:128',
        'link' => 'required|max:512',
        'topic_id' => 'required',
    ]; //todo move to controller https://laravel.com/docs/5.8/validation#creating-form-requests
    /**
     * Get Array (for Json) during response SUCCESS
     *
     * @param $actionType string 'store'|'update'|'delete'
     * @param $successText string optional for custom text ($actionType will be ignored)
     * @return array
     */
    private function getJsonSuccess($actionType, $successText = '')
    {
        if ($successText === '') {
            $successText = 'Lesson d Successfully';
//            $a = strpos($body , 'TEMP');
            $successText = substr_replace(
                $successText,
                $actionType,
                strpos($successText, 'd'),
                0
            );

        }
        return [
            'status' => 'success',
            'body' => $successText
        ];
    }

    /**
     * Get Array (for Json) during response FAIL
     *
     * @param $errorText string|null
     *      if 'validation failed'      use ($validator->error)
     *      if 'record does not exist'  use null
     * @return array
     */
    private function getJsonFail($errorText)
    {
        if (isset($errorText)) {
            $title = 'validation failed';
        } else {
            $title = 'record does not exist';
        }
        return [
            'status' => 'fail',
            'head' => $title,
            'body' => $errorText
        ];
    }

    private function exists()
    {

        return true;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->requiredFieldSet);

        if ($validator->fails()) {
            return response()->json(
                $this->getJsonFail($validator->errors())
            );
        }

        // todo research mutator & accessor
//        $lesson = Lesson::query()->create($request->all());
        $lesson = new Lesson();
        $lesson->fill($request->all());
        $lesson->save();

        $response = response()->json(
            $this->getJsonSuccess(__FUNCTION__)
        );


//        var_dump(" --- ");
//        var_dump("Request data");
//        var_dump($request->all());
//        var_dump(" --- ");
//        var_dump("Model array");
//        var_dump($lesson->toArray());
//        var_dump(" --- ");
//        var_dump("Model json");
//        var_dump($lesson->toJson());
//        var_dump(" --- ");
//        var_dump("LessonController@store");
//        dd();
        return $response;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        var_dump("OK");
        var_dump("LessonController@index");
        dd();
    }

    /**
     * Display the specified resource.
     *
     * @param Lesson $lesson
     * @return Response
     */
    public function show(Lesson $lesson)
    {
        var_dump("OK");
        var_dump("LessonController@show");
        dd();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Lesson $lesson
     * @return Response
     */
    public function update(Request $request, Lesson $lesson)
    {
        var_dump("OK");
        var_dump("LessonController@update");
        dd();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Lesson $lesson
     * @return Response
     */
    public function delete(Lesson $lesson)
    {
        var_dump("OK");
        var_dump("LessonController@delete");
        dd();
    }
}
