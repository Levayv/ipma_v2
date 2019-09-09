//todo create or insert -- change to delete
import {CRUD_READ_ALL} from "../action-types"
export function crud_read_all(payload) {
    return {type: CRUD_READ_ALL, payload}
}
import {CRUD_READ} from "../action-types"
export function crud_read(payload) {
    return {type: CRUD_READ, payload}
}
import {CRUD_CREATE} from "../action-types"
export function crud_create(payload) {
    return {type: CRUD_CREATE, payload}
}
import {CRUD_UPDATE} from "../action-types"
export function crud_update(payload) {
    return {type: CRUD_UPDATE, payload}
}
import {CRUD_DELETE} from "../action-types"
export function crud_delete(payload) {
    return {type: CRUD_DELETE, payload}
}
import {FORM_DATA_UPDATE} from "../action-types/index"
export function form_data_update(payload) {
    return {type: FORM_DATA_UPDATE, payload}
}
import {FORM_DATA_UPDATE_NAME} from "../action-types/index"
export function form_data_update_name(payload) {
    return {type: FORM_DATA_UPDATE_NAME, payload}
}
import {DIABOLICAL_REDIRECT} from "../action-types/index"
export function form_data_update_link(payload) {
    return {type: DIABOLICAL_REDIRECT, payload}
}