import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
