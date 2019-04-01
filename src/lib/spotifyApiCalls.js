import SpotifyWebApi from 'spotify-web-api-js';

export function setAccess() {
  const spotifyApi = new SpotifyWebApi();
  const params = getHashParams();
  const token = params.access_token;
  if (token) {
    spotifyApi.setAccessToken(token);
  }
  return spotifyApi;
}

function getHashParams() {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

export async function getNowPlaying() {
  try {
    const response = await setAccess().getMyCurrentPlaybackState();

    console.log(response)
    if (response) {
      return {
        nowPlaying: {
          song: response.item.name,
          artists: response.item.artists,
          album: response.item.album.name,
          releaseDate: response.item.album.release_date,
          image: response.item.album.images[0].url
        }
      }
    }
  } catch (e) {
    return null;
  }
}

export async function getArtistTracks(artist) {
  try {
    const response = await setAccess().getArtistTopTracks(artist, 'GB');
    return response.tracks.map((t) => {
      const track = {
        image: t.album.images[0].url,
        song: t.name,
        artist: t.artists,
        album: t.album.name,
        preview: t.preview_url
      };
      getAudioFeatures(t.id).then((m)=> track.mood = m);
      return track;
    })
  } catch (e) {
    return [];
  }
}

export async function getAudioFeatures(track) {
  try {
    const response = await setAccess().getAudioFeaturesForTrack(track);
    const valence = response.valence;
    const energy = response.energy;
    if (valence < 0.5 && energy < 0.5){
        return "Mellow"
    }
    return "Upbeat";
  } catch (e) {
    return null;
  }
}

export async function controls(action) {
  try {
    const track = await setAccess();
    if(action === "play"){
      track.play();
    }else if(action === "pause"){
      track.pause();
    }else if(action === "next"){
      track.skipToNext();
    }else{
      track.skipToPrevious();
    }
  } catch (e) {
    return null;
  }
}