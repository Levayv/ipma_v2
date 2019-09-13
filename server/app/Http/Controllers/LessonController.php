<?php

namespace App\Http\Controllers;

use App\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class LessonController extends Controller
{
    public function __construct()
    {
        $this->middleware('CheckLessonAvailability')
            ->only(
                ['show', 'update']
            );
    }

    /**
     * The required fields. Used by Controller Action's Validate function ($rule argument).
     *
     * @var array
     */
    private $requiredFieldSet = [
        'name' => 'required|max:128',
        'link' => 'required|max:512',
        'topic_id' => 'required',
    ];

    /**
     * Get Array (for Json) during response SUCCESS
     *
     * @param $actionType string 'store' | 'update' | 'delete'
     * @param $successText string optional for custom text ($actionType will be ignored)
     * @return array [status , message]
     */
    public static function getJsonSuccess($actionType, $successText = '')
    {
        if ($successText === '') {
            $successText = 'Lesson d Successfully';
            $successText = substr_replace(
                $successText,
                $actionType,
                strpos($successText, 'd'),
                0
            );

        }
        return [
            'status' => 'success',
            'message' => $successText
        ];
    }

    /**
     * Get Array (for Json) during response FAIL
     *
     * @param $errorText string|null
     *      if 'validation failed'      use ($validator->error)
     *      if 'record does not exist'  use null
     * @return array [status , head , message]
     */
    public static function getJsonFail($errorText)
    {
        $json = [
            'status' => 'fail',
        ];
        if (isset($errorText)) {
            $title = 'validation failed';
            $json['error'] = $errorText;

        } else {
            $title = 'record does not exist';
        }
        $json['message'] = $title;
        return $json;
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
                self::getJsonFail($validator->errors())
            );
        }

        // todo research mutator & accessor
        // $lesson = Lesson::query()->create($request->all());

        $lesson = new Lesson();
        $lesson->fill($request->all());
        $lesson->save();

        $response = response()->json(
            self::getJsonSuccess(__FUNCTION__)
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
        //todo research pagination

        $lessonList = Lesson::query()
            ->orderByDesc('updated_at')
            ->get();

        return response()->json($lessonList);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id)
    {
        $lesson = Lesson::query()->find($id);
        return response()->json($lesson);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), $this->requiredFieldSet);
        if ($validator->fails()) {
            return response()->json(
                self::getJsonFail($validator->errors())
            );
        }

        $lesson = Lesson::query()->find($id);
        $lesson->fill($request->all());
        $lesson->save();

        return response()->json(
            self::getJsonSuccess(__FUNCTION__)
        );
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
