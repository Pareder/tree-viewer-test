import React from 'react';
import { Grid } from 'semantic-ui-react';
import LeftTree from './LeftTree';
import RightTree from './RightTree';
import config from '../config';

class DiffViewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jsonData: config.jsonData,
      active: {}
		}
	}

	handleClick = (node, subnode, grandnode) => event => {
    const newActive = this.state.active;
    if (!newActive[node]) {
      newActive[node] = {};
    }

    if (grandnode) {
      if (!newActive[node][subnode][grandnode]) {
        newActive[node][subnode][grandnode] = {}
      }
      newActive[node][subnode][grandnode].active = !newActive[node][subnode][grandnode].active;
    } else if (subnode) {
      if (!newActive[node][subnode]) {
        newActive[node][subnode] = {};
      }
      newActive[node][subnode].active = !newActive[node][subnode].active
    } else if (node) {
      newActive[node].active = !newActive[node].active;
    }

    this.setState((oldState) => ({
      ...oldState,
      active: newActive
    }))
  }

  render() {
  	const { jsonData, active } = this.state;

  	return (
  		<Grid columns={2} centered>
        <Grid.Row>
          <Grid.Column width={8}>
          	<LeftTree
          		left={jsonData.left}
              right={jsonData.right}
          		active={active}
          		handleClick={this.handleClick}
          	/>
          </Grid.Column>
          <Grid.Column width={8}>
          	<RightTree
          		right={jsonData.right}
          		active={active}
          		handleClick={this.handleClick}
          	/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  	);
  }
}

export default DiffViewer;