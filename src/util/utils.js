export const getLocalStorage = name => {
  console.log(name)
  if (!name) return
  return window.localStorage.getItem(name)
}