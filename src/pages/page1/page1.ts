import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ArticledetailPage } from '../../pages/articledetail/articledetail';

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {
    bookmarks: Array < any > ;
    constructor(public navCtrl: NavController, public storage: Storage) {
        this.initializeData();
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter')
        this.initializeData();
    }

    initializeData(){
        this.bookmarks = [];
        this.storage.get('bookmark').then((value) => {
            this.bookmarks = value;
            console.log('this.bookmarks: ', this.bookmarks);
        });
    }



    getSpecificDetail(param, color) {
        this.navCtrl.push(ArticledetailPage, {
            data: param,
            color: color
        });
    }
}
