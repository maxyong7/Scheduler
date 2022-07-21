import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { keywordTypes, timeInterface, timeSlotInterface } from 'src/app/timeinterface';
import { MatDialog } from '@angular/material/dialog';
import { TimelistService } from 'src/app/services/timelist.service';
import { PopUpTaskComponent } from '../pop-up-task/pop-up-task.component';
import { Subscription } from 'rxjs';
import * as secret from 'secrets';


@Component({
  selector: 'app-time-space-item',
  templateUrl: './time-space-item.component.html',
  styleUrls: ['./time-space-item.component.css']
})
export class TimeSpaceItemComponent implements OnInit {
  @Input() timeslotsItems!: timeSlotInterface
  @Input() parentId!: number
  @Output() sendDelete: EventEmitter<timeInterface> = new EventEmitter

  showButton!: boolean

  constructor(private dialog: MatDialog, private timeService: TimelistService) {
  }

  ngOnInit(): void {
  }

  onEdit(time: timeInterface) {
    // console.log("onEdit")
    // console.log(this.timeslotsItems)

    this.timeService.toggleDetail(this.timeslotsItems)

    this.timeService.toggleEdit(true)


  }

  onDelete(value: timeSlotInterface) {

    let dialogRef = this.dialog.open(PopUpTaskComponent, { data: this.timeslotsItems })
    dialogRef.afterClosed().subscribe((toDelete: boolean) => {
      //When "Delete" is clicked
      if (toDelete) {

        //When demoMode is "true"
        if (secret.demoMode) {
          let storedItem = localStorage.getItem("localTimeSlotList");

          if (storedItem) {
            let localTimeSlotList = JSON.parse(storedItem)
            //Get index of array by referring to id
            let pos = localTimeSlotList.map((val: { id: any; }) => val.id).indexOf(this.timeslotsItems.id)
            //Delete array with index
            localTimeSlotList.splice(pos, 1)

            localStorage.setItem("localTimeSlotList", JSON.stringify(localTimeSlotList))

            //Emit to filter deleted object
            this.sendDelete.emit(this.timeslotsItems)
          }
        }

        //When demoMode is "false"
        else {
          this.timeService.deleteTime(value).subscribe((returnedValue) => (this.timeslotsItems = returnedValue))
          this.sendDelete.emit(this.timeslotsItems)
        }
      }

      //When "Delete" is not clicked
      else {
        return
      }
    })

    // this.timeService.deleteTime(timeslotsItems).subscribe(() => (this.timeSlotList = this.timeSlotList.filter((t) => t.id !== value.id)))

  }

  onClick(time: timeInterface) {
    // const dialogRef = this.dialog.open(PopUpTaskComponent, { data: this.timeslotsItems })
    // console.log(this.timeslotsItems)
    // console.log("onclick")
    this.timeService.toggleDetail(this.timeslotsItems)

    this.timeService.toggleEdit(false)
    this.timeService.toggleAdd(false)

    // dialogRef.afterClosed().subscribe(() => { this.timeService.toggleEdit(false), console.log("toggleEdit: false") })
  }

}
