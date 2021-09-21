import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ParallaxService } from 'src/app/core/services/parallax-service';
import { ToastService } from 'src/app/core/services/toast-service';

@Component({
    templateUrl: 'item-details-parallax.page.html',
    styleUrls: ['item-details-parallax.page.scss'],
    providers: [ParallaxService]

})
export class ItemDetailsParallaxPage {

    data = {
        'toolbarTitle': ''
    };
    type: string;

    constructor(
        public navCtrl: NavController,
        private service: ParallaxService,
        private toastCtrl: ToastService) {
        this.service.load().subscribe(d => {
            this.data = d;
        });
    }

    isType(item) {
        return item === parseInt(this.type, 10);
    }

    // events
    onLike(params) {
        this.toastCtrl.presentToast('onLike');
    }

    onItemClick(params) {
        this.toastCtrl.presentToast('onItemClick:' + JSON.stringify(params));
    }

    onAddToCart(params): void {
        this.toastCtrl.presentToast('Add to Cart');
    }

    onComment(params): void {
        this.toastCtrl.presentToast('onComment');
    }

    onMessage(params): void {
        this.toastCtrl.presentToast('onMessage');
    }

    onFollow(params): void {
        if (params.btFollowing == "Following") {
            params.btFollowing = "Follow";
        } else {
            params.btFollowing = "Following";
        }
        this.toastCtrl.presentToast('onFollow');
    }
}
