import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';

import PlaylistListItem from 'containers/PlaylistListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import PlaylistsList from '../index';

describe('<PlaylistsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <PlaylistsList loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <PlaylistsList
          loading={false}
          error={{ message: 'Loading failed!' }}
        />
      </IntlProvider>
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the playlistsitories if loading was successful', () => {
    const playlists = [{
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'react-boilerplate/react-boilerplate',
    }];
    const renderedComponent = shallow(
      <PlaylistsList
        playlists={playlists}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={playlists} component={PlaylistListItem} />)).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <PlaylistsList
        playlists={false}
        error={false}
        loading={false}
      />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
