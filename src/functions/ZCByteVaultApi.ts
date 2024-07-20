import Playlist from "../objects/Playlist";
import Song from "../objects/Song";

async function getPlaylistJsonArr(): Promise<any[] | null> {
  try {

    const options = { method: 'GET', headers: { 'User-Agent': 'ZCApi' } };
    const response = await fetch('https://raw.githubusercontent.com/TheByteVault/ZCByteVault/main/Music/playlists/playlists_data.json', options);
    if (!response.ok) {
      throw new Error(`getPlaylistsJson Error: ${response.status}`);
    }
    const data = await response.json();
    const playlistJsonArr = data;
    return playlistJsonArr;
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return null;
  }
}

function parsePlaylistJson(playlistJson: any): Playlist {
  const { name, songs } = playlistJson; // songs is an array of songJsons so must convert

  const playlist: Playlist = new Playlist(name, parseSongJsonArr(songs));
  return playlist;
}

function parseSongJson(songJson: any): Song {
  const { author, source, title, streamLink } = songJson;
  const song: Song = new Song(author, streamLink, title, source);
  return song;
}

function parseSongJsonArr(songJsonArr: any[]): Song[] {
  const songArr: Song[] = [];
  for (const songJson of songJsonArr) {
    const song: Song = parseSongJson(songJson);
    songArr.push(song);
  }
  return songArr;
}

function parsePlaylistJsonArr(playlistJsonArr: any[]): Playlist[] {
  const playlistArr: Playlist[] = [];
  for (const playlistJson of playlistJsonArr) {
    const playlist: Playlist = parsePlaylistJson(playlistJson);
    playlistArr.push(playlist);
  }
  return playlistArr;
}

export async function getPlaylists(): Promise<Playlist[] | null> {
  const playlistJsonArr: any[] | null = await getPlaylistJsonArr(); // the array is represented as a string, so we need to convert it to an array of "strings" basically
  console.log(playlistJsonArr);

  if (!playlistJsonArr) {
    return null;
  }

  return parsePlaylistJsonArr(playlistJsonArr);
};