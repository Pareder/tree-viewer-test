import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import DiffViewer from './components/DiffViewer';
import classes from './styles';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container style={classes.root}>
          <DiffViewer />
        </Container>
      </div>
    );
  }
}

export default App;
