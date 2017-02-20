import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SamplePagePage } from '../pages/sample-page/sample-page';
import { SampleServices } from '../providers/sample-services';
import { CategoryPagePage } from '../pages/category-page/category-page';
import { ArticlePage } from '../pages/article/article';
import { ArticledetailPage } from '../pages/articledetail/articledetail';
import { Storage } from '@ionic/storage';
@NgModule({
    declarations: [
        MyApp,
        Page1,
        Page2,
        SamplePagePage,
        CategoryPagePage,
        ArticlePage,
        ArticledetailPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page1,
        Page2,
        SamplePagePage,
        CategoryPagePage,
        ArticlePage,
        ArticledetailPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, SampleServices, Storage]
})
export class AppModule {}
