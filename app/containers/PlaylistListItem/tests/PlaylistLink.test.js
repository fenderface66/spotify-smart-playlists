import React from 'react';
import { shallow, render } from 'enzyme';

import PlaylistLink from '../PlaylistLink';

describe('<PlaylistLink />', () => {
  it('should render an <a> tag', () => {
    const renderedComponent = render(<PlaylistLink />);
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<PlaylistLink />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<PlaylistLink id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<PlaylistLink attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
