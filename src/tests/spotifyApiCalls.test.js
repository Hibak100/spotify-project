import {getNowPlaying, setAccess} from "../lib/spotifyApiCalls.js";
import * as sinon from 'sinon';

describe('getNowPlaying', () => {
  it('should return formatted data', () => {
    const stub = sinon.stub(setAccess(), 'getMyCurrentPlaybackState').returns({
      "item": {
        "album": {
          "images": [
            {
              "url": "https://i.scdn.co/image/c3c6415b0bcec8bc64c57954a82bd786dca01495"
            }
          ],
          "name": "Hurt No More",
          "release_date": "2005-04-20",
        },
        "artists": [
          {
            "name": "Mario Winans"
          }
        ],
        "name": "I Don't Wanna Know (feat. Enya And P. Diddy)",
      }
    });
    const np = getNowPlaying();
    expect(np).toEqual();
    stub.restore()
  });

});
