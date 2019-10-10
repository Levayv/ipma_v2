<?php /** @noinspection PhpInconsistentReturnPointsInspection */

namespace App\Providers;

use App\Lesson;
use App\Policies\LessonPolicy;
use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        Lesson::class => LessonPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // role based access control
        Gate::define('supervise', function (User $user) {
            $role = $user->getRole();
            return ($role === 'super_admin') ? true : false;
        });
        // todo research best practices
        Gate::define('teach', function (User $user) {
            $role = $user->getRole();
            return ($role === 'mentor_admin') ? true : false;
        });
        Gate::define('learn', function (User $user) {
            $role = $user->getRole();
            return ($role === 'intern_user') ? true : false;
        });


        // todo migrate all to policies
        // permission based access control
        Gate::define('read_lesson', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('read_lesson', $permissions) ? true : false;
        });
        Gate::define('create_lesson', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('create_lesson', $permissions) ? true : false;
        });
        Gate::define('update_lesson', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('update_lesson', $permissions) ? true : false;
        });

        Gate::define('delete_lesson', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('delete_lesson', $permissions) ? true : false;
        });
        Gate::define('read_user', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('read_user', $permissions) ? true : false;
        });
        Gate::define('create_user', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('create_user', $permissions) ? true : false;
        });
        Gate::define('update_user', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('update_user', $permissions) ? true : false;
        });
        Gate::define('delete_user', function (User $user) {
            $permissions = $user->getPermissions();
            return in_array('delete_user', $permissions) ? true : false;
        });
        //
    }
}
