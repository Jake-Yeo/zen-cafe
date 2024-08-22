import Playlist from "../objects/Playlist";
import Radio from "../objects/Radio";
import Song from "../objects/Song";
import { encryptedZenCafeApiKey, zenCafeApiUrl } from "./envVars";

async function getRadioJson(): Promise<any[] | null> {
  try {

    // const options = { method: 'GET', headers: { 'User-Agent': 'ZCApi' } };

    //const response = await fetch('https://zen-cafe-production.up.railway.app/zcByteVault/fetchRadioJson', options);

    const response = await fetch(`${zenCafeApiUrl}/zcByteVault/fetchRadioJson`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${encryptedZenCafeApiKey}`
      },
    });

    if (!response.ok) {
      throw new Error(`getPlaylistsJson Error: ${response.status}`);
    }

    const data = await response.json();
    const radioJson = data;
    return radioJson;
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return null;
  }
}

function parsePlaylistJson(playlistJson: any): Playlist {
  const { name, id, songs } = playlistJson; // songs is an array of songJsons so must convert

  const playlist: Playlist = new Playlist(name, parseSongJsonArr(songs), id);
  return playlist;
}

function parseSongJson(songJson: any): Song {
  const { author, id, title, streamLink } = songJson;
  const song: Song = new Song(author, streamLink, title, id);
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

function parseRadioJson(radioJson: any): Radio {
  const { playlists } = radioJson;

  const playlistArr: Playlist[] = [];
  for (const playlistJson of playlists) {
    const playlist: Playlist = parsePlaylistJson(playlistJson);
    playlistArr.push(playlist);
  }
  return new Radio(playlistArr);
}

export async function getRadio(): Promise<Radio | null> {
  const radioJson: any[] | null = await getRadioJson(); // the array is represented as a string, so we need to convert it to an array of "strings" basically
  console.log(radioJson);

  if (!radioJson) {
    return null;
  }

  return parseRadioJson(radioJson);
};