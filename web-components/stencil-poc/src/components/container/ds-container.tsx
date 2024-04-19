import { Component, h } from '@stencil/core';

@Component({
  tag: 'ds-container',
  shadow: true,
})
export class DsContainer {
  render() {
    return (
      <div>
        <slot name="item"></slot>
      </div>
    );
  }
}
