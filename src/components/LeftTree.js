import React from 'react';
import { Card, Accordion, Icon } from 'semantic-ui-react';
import { trimString } from '../helpers';

class LeftTree extends React.Component {
  render() {
  	const { left, right, active } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{left.info.id}</Card.Header>
          <Card.Description>{new Date(left.info.endTimestamp).toUTCString()}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Accordion exclusive={false} styled={true}>
            {Object.keys(left.nodes).map((node, idx) => (
              <React.Fragment key={idx}>
                <Accordion.Title active={active[node] && active[node].active} onClick={this.props.handleClick(node)}>
                  <Icon name='dropdown' />
                  {node}
                </Accordion.Title>
                <Accordion.Content active={active[node] && active[node].active}>
                  {Object.keys(left.nodes[node]).length > 0 && (
                    <Accordion.Accordion exclusive={false}>
                      {Object.keys(left.nodes[node]).map((subnode, subidx) => (
                        <React.Fragment key={`${idx}_${subidx}`}>
                         <Accordion.Title active={active[node] && active[node][subnode] && active[node][subnode].active} onClick={this.props.handleClick(node, subnode)}>
                            <Icon name='dropdown' />
                            {subnode}
                          </Accordion.Title>
                          <Accordion.Content active={active[node] && active[node][subnode] && active[node][subnode].active}>
                            {left.nodes[node][subnode] && left.nodes[node][subnode].length > 0 && (
                              <Accordion.Accordion exclusive={false}>
                                {left.nodes[node][subnode].map((grandnode, grandidx) => {
                                  if (right.nodes[node] && right.nodes[node][subnode] && right.nodes[node][subnode].elements) {
                                    const grandnodeRight = right.nodes[node][subnode].elements.find(item => item.name === grandnode);
                                    if (grandnodeRight && grandnodeRight.changes) {
                                      return (
                                        <React.Fragment key={`${idx}_${subidx}_${grandidx}`}>
                                          <Accordion.Title active={active[node] && active[node][subnode] && active[node][subnode][grandnode] && active[node][subnode][grandnode].active} onClick={this.props.handleClick(node, subnode, grandnode)}>
                                            <Icon name='dropdown' />
                                            <span>{trimString(grandnode)}</span>
                                          </Accordion.Title>
                                          <Accordion.Content active={active[node] && active[node][subnode] && active[node][subnode][grandnode] && active[node][subnode][grandnode].active}>
                                            <Accordion.Accordion>
                                              {Object.keys(grandnodeRight.changes).map((change, changeIdx) => (
                                                <Accordion.Title key={`${idx}_${subidx}_${grandidx}_${changeIdx}`}>
                                                  {change}: {grandnodeRight.changes[change].old}
                                                </Accordion.Title>
                                              ))}
                                            </Accordion.Accordion>
                                          </Accordion.Content>
                                        </React.Fragment>
                                      )
                                    }
                                  }
                                  return (
                                    <Accordion.Title key={`${idx}_${subidx}_${grandidx}`}>
                                      <Icon name='file' />
                                      <span>{trimString(grandnode)}</span>
                                    </Accordion.Title>
                                  )
                                })}
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

export default LeftTree;