import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'app-test3',
    templateUrl: './test3.component.html',
    styleUrls: ['./test3.component.less']
})
export class Test3Component implements OnInit {

    constructor() { }
    moment = moment;
    ngOnInit(): void {
        // const aa = moment('2012/12/12').format();
        // console.log(aa)
    }

}
