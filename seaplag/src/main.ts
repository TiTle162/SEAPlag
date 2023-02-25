import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/mode/multiplex';
import 'codemirror/addon/mode/loadMode';
import 'codemirror/mode/clike/clike.js';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
