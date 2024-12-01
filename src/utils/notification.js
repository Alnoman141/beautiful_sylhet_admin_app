import { ElNotification } from 'element-plus'

export function notify(title, errorResponse, type, position) {
  // if errorResponse is an object, it means it's a single error message
  if (typeof errorResponse === 'object' && errorResponse instanceof Object) {
    for (const key in errorResponse) {
      if (errorResponse.hasOwnProperty(key)) {
        const errorMessages = errorResponse[key]
  
        // Loop through each error message in the array
        for (const errorMessage of errorMessages) {
          ElNotification({
            title: title,
            message: errorMessage,
            type: type,
            position: position,
          })
        }
      }
    }
  } else {
    // if errorResponse is an array, it means it's multiple error messages
    ElNotification({
      title: title,
      message: errorResponse,
      type: type,
      position: position,
    })
  }
  
}
