import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ds-header',
  styleUrl: 'ds-header.css',
  shadow: true,
})
export class DsHeader {
  @Prop()
  dsTitle: string;

  render() {
    return (
      <header>
        <h1>{this.dsTitle}</h1>
        <slot name="item"></slot>
      </header>
    );
  }
}
