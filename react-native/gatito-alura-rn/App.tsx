import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import StandardView from './src/components/StandardView';
import Routes from './src/Routes';

export default function App() {
  return (
    <StandardView>
      <Routes />
    </StandardView>
  );
}
