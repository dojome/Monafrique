const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user && { Authorization: 'Bearer ' + user.token }
}

export default authHeader
