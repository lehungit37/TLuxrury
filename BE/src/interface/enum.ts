export enum ERoleLevel {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  USER = 2,
}

export enum EPermission {
  GET_LIST_ROOM = "get_list_room",
  ADD_ROOM = "add_room",
  UPDATE_ROOM = "update_room",
  DELETE_ROOM = "delete_room",

  GET_LIST_BOOKING = "get_list_booking",
  ADD_BOOKING = "add_booking",
  UPDATE_BOOKING = "update_booking",
  DELETE_BOOKING = "delete_booking",

  PAYMENT = "payment",
  EXPORT_INVOICE = "export_invoice",
  VIEW_REVENUE = "view_revenue",

  GET_LIST_USER = "get_list_user",
  UPDATE_USER = "update_user",
  ADD_USER = "add_user",
  DELETE_USER = "delete_user",

  GET_LIST_ROLE = "get_list_role",
  ADD_ROLE = "add_role",
  UPDATE_ROLE = "update_role",
  DELETE_ROLE = "delete_role",
}
