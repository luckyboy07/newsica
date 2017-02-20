import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
/*
  Generated class for the Articledetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-articledetail',
    templateUrl: 'articledetail.html'
})
export class ArticledetailPage {
    item: any;
    colors: string;
    favourites: Array < any > ;
    redundant: any;
    Loading: any;
    isRedundant:boolean =false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.item = this.navParams.get('data');
        this.colors = this.navParams.get('color');
        storage.get('bookmark').then((value) => {
            if (_.isEmpty(value)) {
                this.favourites = [];
            } else {
                this.favourites = value;
            }
            this.redundant = _.find(this.favourites, { title: this.item.title });
            if (!_.isUndefined(this.redundant)) {
                this.item._id = this.redundant._id;
                this.isRedundant = true;
            }
        });
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ArticledetailPage');
    }
    openPage(url) {
        new InAppBrowser(url, '_blank', 'location=yes');
        // browser.show();
    }
    bookmark(item) {
        item.color = this.colors;
        item._id = UUID.UUID();
        this.favourites.push(item)
        this.favourites = _.uniqBy(this.favourites, 'title');
        // this.storage.remove('bookmark');
        this.storage.set('bookmark', this.favourites);
        let alert = this.alertCtrl.create({
            title: 'Added to bookmark!',
            buttons: ['Dismiss']
        });
        alert.present();
        this.isRedundant = true;
    }

    // public presentLoading() {
    //     let loader = this.loadingCtrl.create({
    //         content: "Please wait...",
    //         duration: 3000
    //     });
    //     loader.present();
    //     this.storage.get('bookmark').then((value) => {
    //         if (_.isEmpty(value)) {
    //             this.favourites = [];
    //         } else {
    //             this.favourites = value;
    //         }
    //         console.log('this.favourites:', this.favourites);
    //         this.redundant = _.find(this.favourites, { title: this.item.title });
    //         if (!_.isUndefined(this.redundant)) {
    //             this.item._id = this.redundant._id;
    //         }
    //     });
    // }
    removebookmark(item) {
        console.log('item:', item);
        let vas = _.filter(this.favourites, (value) => {
            return value._id != item._id;
        });
        let confirm = this.alertCtrl.create({
            title: 'Bookmark',
            message: 'Remove bookmark?',
            buttons: [{
                text: 'No',
                handler: () => {
                    console.log('Disagree clicked');
                }
            }, {
                text: 'Yes',
                handler: () => {
                    this.storage.set('bookmark', vas);
                    this.redundant = {};
                    this.isRedundant = false;
                }
            }]
        });
        confirm.present();
    }
}
