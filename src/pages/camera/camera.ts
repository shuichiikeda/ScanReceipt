import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';
import { Platform } from 'ionic-angular'

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
  providers: [ Camera ]
})
export class CameraPage {
  imgSrc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    console.log(111111);
    console.log(options);

    this.camera
      .getPicture(options)
      .then((imageData)=>{
        console.log(normalizeURL(imageData));
        this.imgSrc = (this.platform.is('ios'))
          ? normalizeURL(imageData) : 'data:image/jpeg;base64,' + imageData;
      })
      .catch((err)=>{
        console.log(err);
      });
  }
}
