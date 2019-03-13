import React from 'react';
import { Card, Accordion, Icon } from 'semantic-ui-react';
import classes from '../styles';
import { trimString } from '../helpers';

class RightTree extends React.Component {
	render() {
		const { right, active } = this.props;

		return (
			<Card fluid>
        <Card.Content>
          <Card.Header>{right.info.id}</Card.Header>
          <Card.Description>{new Date(right.info.endTimestamp).toUTCString()}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Accordion exclusive={false} styled={true}>
            {Object.keys(right.nodes).map((node, idx) => (
              <React.Fragment key={idx}>
                <Accordion.Title active={active[node] && active[node].active} onClick={this.props.handleClick(node)}>
                  <Icon name='dropdown' />
                	<span style={classes[right.nodes[node].status]}>{node}</span>
                </Accordion.Title>
                <Accordion.Content active={active[node] && active[node].active}>
                  {Object.keys(right.nodes[node]).length > 1 && (
                		<Accordion.Accordion>
                      {Object.keys(right.nodes[node]).map((subnode, subidx) => subnode !== 'status' && (
                        <React.Fragment key={`${idx}_${subidx}`}>
                          <Accordion.Title active={active[node] && active[node][subnode] && active[node][subnode].active} onClick={this.props.handleClick(node, subnode)}>
                            <Icon name='dropdown' />
                            <span style={classes[right.nodes[node][subnode].status]}>{subnode}</span>
                          </Accordion.Title>
                          <Accordion.Content active={active[node] && active[node][subnode] && active[node][subnode].active}>
                            {right.nodes[node][subnode].elements && right.nodes[node][subnode].elements.length > 0 && (
                              <Accordion.Accordion>
                                {right.nodes[node][subnode].elements.map((grandnode, grandidx) => (
                                  grandnode.changes
                                  ? <React.Fragment key={`${idx}_${subidx}_${grandidx}`}>
                                    <Accordion.Title active={active[node] && active[node][subnode] && active[node][subnode][grandnode.name] && active[node][subnode][grandnode.name].active} onClick={this.props.handleClick(node, subnode, grandnode)}>
                                      <Icon name='dropdown' />
                                      <span style={classes[grandnode.status]}>{trimString(grandnode.name)}</span>
                                    </Accordion.Title>
                                    <Accordion.Content active={active[node] && active[node][subnode] && active[node][subnode][grandnode.name] && active[node][subnode][grandnode.name].active}>
                                      <Accordion.Accordion>
                                        {Object.keys(grandnode.changes).map((change, changeIdx) => (
                                          <Accordion.Title key={`${idx}_${subidx}_${grandidx}_${changeIdx}`}>
                                            {change}: {grandnode.changes[change].new}
                                          </Accordion.Title>
                                        ))}
                                      </Accordion.Accordion>
                                    </Accordion.Content>
                                  </React.Fragment>
                                  : <Accordion.Title key={`${idx}_${subidx}_${grandidx}`}>
                                    <Icon name='file' />
                                    <span style={classes[grandnode.status]}>{trimString(grandnode.name)}</span>
                                  </Accordion.Title>
                                ))}
                              </Accordion.Accordion>
                            )}
                          </Accordion.Content>
                        </React.Fragment>
                      ))}
                  	</Accordion.Accordion>
                  )}
                </Accordion.Content>
              </React.Fragment>
            ))}
          </Accordion>
        </Card.Content>
      </Card>
		);
	}
}

export default RightTree;