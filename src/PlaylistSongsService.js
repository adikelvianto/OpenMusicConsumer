const { Pool } = require('pg');
 
class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistsongs(id) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlistsongs
      INNER JOIN songs ON songs.id = playlistsongs.song_id 
      WHERE playlistsongs.playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
  
  async getPlaylist(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
}
}

module.exports = PlaylistSongsService;