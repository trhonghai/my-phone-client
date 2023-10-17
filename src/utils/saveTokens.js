function saveTokens(access_token, refresh_token) {
    localStorage.setItem('user', JSON.stringify({ access_token, refresh_token }))
}

export default saveTokens
