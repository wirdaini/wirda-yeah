import axios from 'axios'

const API_URL = 'https://jyeezagvihgqbacavape.supabase.co/rest/v1/users'

const API_KEY = 'sb_publishable_RJLMCC0pcLUtSvOO8i6RIQ_8EsbO7Zo'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

export const usersAPI = {
  async fetchUsers() {
    const response = await axios.get(API_URL, { headers })
    return response.data
  },

  async createUser(userData) {
    const response = await axios.post(
      API_URL,
      userData,
      { headers }
    )
    return response.data
  },

  async updateUser(id, userData) {
    const response = await axios.patch(
      `${API_URL}?id=eq.${id}`,
      userData,
      { headers }
    )
    return response.data
  },

  async deleteUser(id) {
    await axios.delete(
      `${API_URL}?id=eq.${id}`,
      { headers }
    )
    return true
  }
}