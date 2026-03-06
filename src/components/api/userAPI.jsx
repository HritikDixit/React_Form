const checkUsernameUnique = async (username) => {
  await new Promise((r) => setTimeout(r, 800))

  const taken = ['admin', 'test', 'user']
  return !taken.includes(username.toLowerCase())
}

export default checkUsernameUnique
