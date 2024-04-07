import { Component, h } from '@stencil/core';

@Component({
  tag: 'ds-footer',
  styleUrl: 'ds-footer.css',
  shadow: true,
})
export class DsFooter {
  render() {
    return <footer>Made with {'<3'} by Guilherme Gules Moreira</footer>;
  }
}
