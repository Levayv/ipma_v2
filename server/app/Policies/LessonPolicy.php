<?php

namespace App\Policies;

use App\Lesson;
use App\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Gate;

class LessonPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any lessons.
     *
     * @param User $user
     * @return mixed
     */
    public function index(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the lesson.
     *
     * @param User $user
     * @param Lesson $lesson
     * @return mixed
     */
    public function show(User $user, Lesson $lesson)
    {
        return true;
    }

    /**
     * Determine whether the user can create lessons.
     *
     * @param User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the lesson.
     *
     * @param User $user
     * @param Lesson $lesson
     * @return boolean
     * @throws AuthorizationException
     * @see allowOnlyOwner
     */
    public function update(User $user, Lesson $lesson)
    {
        return $this->allowOnlyOwner($user, $lesson);
    }

    /**
     * Determine whether the user can delete the lesson.
     *
     * @param User $user
     * @param Lesson $lesson
     * @return boolean
     * @throws AuthorizationException
     * @see allowOnlyOwner
     */
    public function delete(User $user, Lesson $lesson)
    {
        return $this->allowOnlyOwner($user, $lesson);
    }
    /**
     * Returns true if resource was owned/created by the user false otherwise
     *
     * @param User $user
     * @param Lesson $lesson
     * @return boolean
     * @throws AuthorizationException
     */
    private function allowOnlyOwner(User $user, Lesson $lesson)
    {
        if (Gate::allows('supervise')) {
            return true;
        } else {
            // check ownership of created lesson
            if ($user->id === $lesson->user_id){
                return true;
            }else{
                $this->deny("This Lesson is not created by you, leave it alone. Please and thank you.");
            }
        }
    }
}
