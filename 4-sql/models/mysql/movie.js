import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'abc123.',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      if (genre.length === 0) return []

      const [{ id }] = genres

      const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(m.id) as movie_id, m.title, m.year, m.director, m.duration, m.poster, m.rate FROM movie_genres AS mg JOIN movie AS m ON mg.movie_id = m.id WHERE mg.genre_id = ?;', [id]
      )

      return movies
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie;'
    )

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // TODO: crear la conexión de genre

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
      `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
      VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
      [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // !!! Puede enviarle información sensible
      throw new Error('Error creating movie')
      // Enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [movie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) AS id 
      FROM movie WHERE id = UUID_TO_BIN(?);`, [uuid]
    )

    return movie[0]
  }

  static async delete ({ id }) {
    // TODO: crear el delete
  }

  static async update ({ id, input }) {
    // TODO: crear el update
  }
}
