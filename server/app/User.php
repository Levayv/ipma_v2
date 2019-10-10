<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property integer id magic
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        // todo : add role
        return [
            'role' => $this->getRole()
        ];
    }

    /**
     * ???
     *
     * @return array Permission Names of Current user
     */
    public function getPermissions()
    {
        $roleID = $this->role_id;
        $permissionToRoleCollection = DB::table('permission_to_role')
            ->where('role_id', '=', $roleID)
            ->orderBy('id')
            ->get('permission_id');

        // todo refactor using pluck();
        $permissionIDs = [];
        foreach ($permissionToRoleCollection as $permissionToRole) {
            array_push($permissionIDs, $permissionToRole->permission_id);
        }

        $permissionCollection = DB::table('permissions')
            ->whereIn('id', $permissionIDs)
            ->orderBy('id')
            ->get('name');

        // todo refactor using pluck();
        $permissionNames = [];
        foreach ($permissionCollection as $permission) {
            array_push($permissionNames, $permission->name);
        }
        return $permissionNames;
    }

    public function getRole()
    {
        $roleID = $this->role_id;
        $roleName = DB::table('roles')
            ->where('id', '=', $roleID)
            ->get('name')[0]
            ->name;
        return $roleName;
    }
}
