import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { hmrModule } from '@angularclass/hmr';

if (process.env.ENV === 'prod') {
    enableProdMode();
    platformBrowserDynamic().bootstrapModule(AppModule);
} else {
    platformBrowserDynamic().bootstrapModule(AppModule).then((ngModuleRef: any) => {
        return hmrModule(ngModuleRef, module);
    });
}

