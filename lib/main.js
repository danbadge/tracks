import path from 'path'
import axios from 'axios'

export async function getRoutesResult() {
  try {
    const res = await axios.get('http://localhost:3000/api/trains/next')
    return res.data
  } catch (error) {
    console.log(error)
  }
}