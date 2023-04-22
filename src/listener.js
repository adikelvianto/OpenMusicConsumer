class Listener {
    constructor(playlistSongsService, mailSender) {
      this._playlistSongsService = playlistSongsService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
        
        const playlist = await this._playlistSongsService.getPlaylist(playlistId);
        const songs = await this._playlistSongsService.getPlaylistsongs(playlistId);

        const resultAttachment = {
          playlist: {
            ...playlist,
            songs,
          },
        };
  
        console.log(resultAttachment);
  
        const result = await this._mailSender.sendEmail(
          targetEmail,
          JSON.stringify(resultAttachment)
        );
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
}
  
module.exports = Listener;