import axios from 'axios'

const http = axios.create({
  baseURL: 'http://54.179.164.7:88/api/',
  timeout: 10000,
  headers: {'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC81NC4xNzkuMTY0Ljc6ODhcL2FwaVwvTmV3TG9naW4iLCJpYXQiOjE3MjExMTcwMjQsImV4cCI6MzYxMzI3NzAyNCwibmJmIjoxNzIxMTE3MDI0LCJqdGkiOiIxTnN0bHlGZTlQRXN6TkJ5Iiwic3ViIjoxNDI3MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImd1YXJkIjoiYXBpIn0.8kFfnu6SLG_2Qp5OXCZas9GF56uW4AAlmIQdVpZ6rlc'}
})
export default http