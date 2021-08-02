import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";

export default function StayCard({ Stay }) {

    const createTime1 = (Stay.checkInTime.split("T"))
    const time1 = (createTime1.pop())
    const date1 = (createTime1.shift())
    const timeSplit1 = ((time1).split(":"))
    const dateSplit1 = ((date1).split("-"))
    const year1 = (dateSplit1[0])
    const day1 = (dateSplit1[2])
    const month1 = (dateSplit1[1])
    const hour1 = (timeSplit1[0])
    const minute1 = (timeSplit1[1])
    const midnightCheck1 = (hour1 === "00" ? "12" : hour1)
    const nightNoon1 = (hour1 > 12 ? " PM" : " AM")
    const TimeStamp1 = day1 + "/" + month1 + "/" + year1 + " @ " + midnightCheck1 + ":" + minute1 + "" + nightNoon1;
    const createTime2 = (Stay.checkOutTime.split("T"))
    const time2 = (createTime2.pop())
    const date2 = (createTime2.shift())
    const timeSplit2 = ((time2).split(":"))
    const dateSplit2 = ((date2).split("-"))
    const year2 = (dateSplit2[0])
    const day2 = (dateSplit2[2])
    const month2 = (dateSplit2[1])
    const hour2 = (timeSplit2[0])
    const minute2 = (timeSplit2[1])
    const midnightCheck2 = (hour2 === "00" ? "12" : hour2)
    const nightNoon2 = (hour2 > 12 ? " PM" : " AM")
    const TimeStamp2 = day2 + "/" + month2 + "/" + year2 + " @ " + midnightCheck2 + ":" + minute2 + "" + nightNoon2;

    return (
        <Card className="m-4">

            <CardBody>
                <h1>STAY #{Stay.id}</h1>
                <p><strong> Room: </strong>{Stay.room.floor}{Stay.room.name}</p>
                <p><strong> Guest: </strong>{Stay.guest.displayName}</p>
                <p><strong>Created By: </strong>{Stay.handler.displayName}</p>
                {Stay.isCheckedIn &&
                    <>
                        <p><strong>Checked In!</strong></p>
                        <p><strong>Checked IN @ </strong>
                            {TimeStamp1}
                        </p>
                    </>
                }
                {!Stay.isCheckedIn &&
                    <>
                        <p><strong>CHECKED OUT</strong></p>
                        <p><strong>Checked IN @ </strong>
                            {TimeStamp1}
                        </p>
                        <p><strong>CECKOUT OUT TIMED @ </strong>{TimeStamp2}</p>
                    </>
                }
            </CardBody>
        </Card>
    );
}