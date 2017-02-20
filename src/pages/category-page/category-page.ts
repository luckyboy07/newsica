import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArticlePage } from '../../pages/article/article';
import * as _ from 'lodash';
/*
  Generated class for the CategoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-category-page',
    templateUrl: 'category-page.html'
})
export class CategoryPagePage {
    sources: Array < any > ;
    category: string;
    data: Array < any > ;
    colors: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.category = this.navParams.get('category');
        this.data = this.navParams.get('data');
        this.colors = this.navParams.get('color');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CategoryPagePage');
        let arrayfilter = _.filter(this.data, { category: this.category });
        this.sources = arrayfilter;
    }

    onNext(id) {
        this.navCtrl.push(ArticlePage, {
            id: id,
            color:this.colors
        })
    }
}
