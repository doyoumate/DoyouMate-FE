const getFormData = (object: { [key: string]: any }) =>
  Object.keys(object).reduce((formData, key) => {
    if (object[key] instanceof Array) {
      object[key].forEach((value: any) => {
        formData.append(key, value)
      })
    } else {
      formData.append(key, object[key])
    }
    return formData
  }, new FormData())

export { getFormData }
