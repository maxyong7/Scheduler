import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timeInterface, timeSlotInterface, keywordTypes } from 'src/app/timeinterface';
import { MatDialog } from '@angular/material/dialog';
import { PopUpTaskComponent } from '../pop-up-task/pop-up-task.component';
import { TimelistService } from 'src/app/services/timelist.service';
import { Subscription } from 'rxjs';
import * as secret from 'secrets';

@Component({
  selector: 'app-time-space',
  templateUrl: './time-space.component.html',
  styleUrls: ['./time-space.component.css']
})
export class TimeSpaceComponent implements OnInit {
  @Input() time!: any
  @Input() timeslotsItems!: any
  // refreshedTimeList!: timeInterface
  // timeList: timeInterface[] = [];
  refreshedTimeList!: any
  timeList: any[] = [];
  subscription!: Subscription
  subscriptionAdd!: Subscription
  public timeSlotList!: any
  public parentId!: number
  static updateTimeSpace: any;

  constructor(public dialog: MatDialog, private timeService: TimelistService) {
    //if Submit is clicked, then it will get a new TimeList again
    // this.subscription = this.timeService.OnRefresh().subscribe((value) => this.timeService.getTime(keywordTypes.timeslots).subscribe((timeList) => (this.timeList = timeList)))
    // this.subscription = this.timeService.OnRefresh().subscribe((value) => (this.timeList = value))
    this.subscription = this.timeService.onRefresh().subscribe(value => this.refreshTimeslotsItem())

    // this.subscription = this.timeService.onAdd().subscribe((value) => (console.log("yoyoyo"), console.log(value), this.mergeProperties(this.submitAddTime(), value)))

  }

  ngOnInit(): void {
    // this.timeService.getTimeSlot(this.time.time).subscribe((value) => (this.timeSlotList = value))

    // //Get data from local storage
    let storedItem = localStorage.getItem("localTimeSlotList");
    if (storedItem) {
      let localTimeSlotList = JSON.parse(storedItem)
      this.timeSlotList = localTimeSlotList.filter((element: { time: any; }) => element.time == this.time.time)
      for (var item of this.timeSlotList) {
      }
    }

  }

  addTask() {
    const itemAddOn = {
      parentId: this.time.id,
      time: this.time.time,
      reminder: false,
      listCheck: false,
      start: false,
      topic: '',
      description: '',
    }

    // console.log("onadd")
    this.timeService.toggleDetail(itemAddOn)
    this.timeService.toggleAdd(true)
    // let dialogRef = this.dialog.open(PopUpTaskComponent)

    // dialogRef.afterClosed().subscribe(result => { this.timeService.toggleEdit(false), console.log(result); if (result) { console.log("afterclosed"), this.mergeProperties(result) } })
  }



  refreshTimeslotsItem(): void {

    //When demoMode is "true"
    if (secret.demoMode) {

      //Get data from local storage
      let storedItem = localStorage.getItem("localTimeSlotList");
      if (storedItem) {
        let localTimeSlotList = JSON.parse(storedItem)
        this.timeSlotList = localTimeSlotList.filter((element: { time: any; }) => element.time == this.time.time)
        // console.log("Filtered:")
        // for (var item of this.timeSlotList) {
        //   console.log(item)
        //   console.log(item.time)
        // }
      }
    }
    //When demoMode is "false"
    else {

      // Get data from backend API
      this.timeService.getTimeSlot(this.time.time).subscribe((value) => (this.timeSlotList = value))
    }

  }

  // onEdit(timeRow: any) {
  //   const dialogRef = this.dialog.open(PopUpTaskComponent, { data: timeRow })
  // }

  // onDelete(timeSelected: timeInterface) {
  //   this.sendDelete.emit(timeSelected)
  // }

  // //Not Used
  // submitAddTime(): any {
  //   const itemAddOn = {
  //     parentId: this.time.id,
  //     time: this.time.time,
  //     reminder: false,
  //     listCheck: false,
  //     start: false
  //   }
  //   return itemAddOn
  //   // this.subscription = this.timeService.onAdd().subscribe((value) => (console.log(value), this.mergeProperties(itemAddOn, value)))
  // }

  // //Not Used
  // mergeProperties(value: any) {
  //   console.log(value)
  //   const itemAddOn: any = {
  //     parentId: this.time.id,
  //     time: this.time.time,
  //     reminder: false,
  //     listCheck: false,
  //     start: false
  //   }
  //   var newItem: any = {};
  //   for (var attrname in itemAddOn) { newItem[attrname] = itemAddOn[attrname]; }
  //   for (var attrname in value) { newItem[attrname] = value[attrname]; }
  //   console.log(newItem)

  //   this.timeService.addTime(newItem).subscribe((value) => this.timeSlotList.push(value))
  //   // //Disable update on backend server 
  //   // this.timeService.addTimeFrontOnly(newItem).subscribe(this.timeSlotList.push(newItem))
  // }

  filterTimeSlot(value: any) {

    this.timeSlotList = this.timeSlotList.filter((t: any) => t.id !== value.id)
  }

}

// updateTimeSpace(timeRowUpdate: any) {
//   this.timeService.addTime(timeRowUpdate).subscribe((value) => this.timeSlotList.push(value))
// }


