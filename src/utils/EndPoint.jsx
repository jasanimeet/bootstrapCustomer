export const EndPoint = {
  LOGIN_USER: 'customer/lab_user_login',
  LOGOUT_USER: 'customer/lab_user_logout',
  FORGET_PASSWORD: 'customer/forget_password',
  RESET_PASSWORD: 'customer/reset_password',
  SEARCH_FILTER_PARAMETER: 'stock/get_search_filter_parameter',

  // User Profile
  GET_USER_PROFILE: 'customer/get_lab_user_profile',
  UPDATE_USER_PROFILE: 'customer/update_lab_user_profile',

  // Change Password
  CHANGE_PASSWORD: 'customer/change_password',

  GET_TOTAL_RESULT_PAGE: 'stock/get_search_stock_total',
  NEWLAB_SEARCH_API: 'stock/get_search_stock_result',

  // Add Cart
  ADD_CART_FROM_RESULT: 'stock/create_update_cart',
  GET_CART: 'stock/get_cart',
  DELETE_CART: 'stock/delete_cart',
  EXCEL_DOWNLOAD: 'stock/cart_excel_export',
  CART_SEND_EMAIL: 'stock/send_cart_email', // send email
  CREATE_UPDATE_ORDER: 'stock/create_update_order',

  // layout Save
  GET_ALL_REPORT: 'stock/get_report_layout_save',
  CREATE_LAYOUT: 'stock/create_update_report_layout_save',
  DELETE_LAYOUT: 'stock/delete_report_layout_save',
  UPDATE_LAYOUT: 'stock/update_report_layout_save_status',

  // Oder
  GET_ORDER: 'stock/get_order',
  EXCEL_DOWNLOAD_ORDER: 'stock/order_excel_export',
  ORDER_SEND_EMAIL: 'stock/send_order_email', // send email

  // Dashbord
  GET_SEARCH_REPORT_RECENT_SEARCH: 'stock/get_search_report_recent_search',
  POST_SEARCH_REPORT_RECENT_SEARCH: 'stock/create_report_recent_search',
  POST_REPORT_STOCK_SAVE_SEARCH: 'stock/create_stock_search_save',
  GET_SAVE_Stock_SEARCH: 'stock/get_saved_stock_search',
  DELETE_STOCK_SEARCH_SAVE: 'stock/delete_stock_search_save',
  TOTAL_COUNT_DASHBORD: 'customer/dashboard',
  GET_SAVE_STOCK_SEARCH_BY_ID: 'stock/get_saved_stock_search_by_id',
  GET_ORDER_SUMMARY: 'stock/get_order_summary',

  // STOCK count
  GET_STOCK_COUNT: 'stock/get_search_stock_total_pcs',
  DOWNLOAD_STOCK: 'stock/export_stock_excel',

};
