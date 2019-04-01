import React from 'react';
import {shallow} from 'enzyme';
import ArtistTracks from "../components/ArtistTracks.js";

describe('ArtistTracks', () => {

  const tracks = [{"mood":"Upbeat"}, {"mood": "Upbeat"},{ "mood": "Mellow"}];
  const component = shallow(<ArtistTracks/>);
  component.setState({ allTracks: tracks });
  component.update();


  it('should render 2 buttons', () => {
    const component = shallow(<ArtistTracks artists={["foo", "bar"]}/>);
    expect(component.find("#artists > button").length).toEqual(2);
  });


  it('should not render table', () => {
    expect(component.find("Table").exists()).toEqual(false);
    expect(component.find(".alert-warning").text()).toEqual("No Tracks Found");
  });


  it('should filter upbeat tracks', () => {
    component.find("#options button").at(1).simulate("click");
    expect(component.state().tracks.length).toEqual(2);
  });


  it('should filter mellow tracks', () => {
    component.find("#options button").at(2).simulate("click");
    expect(component.state().tracks.length).toEqual(1);
  });

});
