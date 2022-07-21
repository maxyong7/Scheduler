export interface timeInterface {
    time: string,
    id?: number


}

export interface timeSlotInterface {
    id?: number,
    parentId: number,
    time: string,
    reminder: boolean,
    topic: string, //
    description: string, //
    listCheck: boolean,
    listItem: string, //
    start: boolean,

}



export enum keywordTypes {
    timeslots = 'timeslots',
    timeslotsItem = 'timeslotsItem',
    parentId = "parentId",
    childId = "id",
    topic1 = "Top Priority",
    topic2 = "Mid Priority",
    topic3 = "Low Priority",
    topic4 = "Notes",
    time1 = "time",
}





