import React from 'react';
import {shallow} from 'enzyme';
import CurrentSong from "../components/CurrentSong.js";

describe('CurrentSong', () => {

  it('should render 2 buttons', () => {
    const component = shallow(<CurrentSong nowPlaying={{}}/>);
    expect(component.find("#artists > button").length).toEqual(2);
  });

});
