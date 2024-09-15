// app/api/algorithm/route.js
import { NextResponse } from 'next/server';
import { checkEligibility, teacherGrant, classRoomGrant, libraryGrant, washroomGrant, waterGrant, grantForWall, grantForHMroom, grantPlayGround, grantElectricity } from "../../lib/algorithm"; // Adjust path as necessary

export async function POST(request) {
    const inputData = await request.json();
    let result = {};

    try {
        const eligibility = checkEligibility(inputData);
        if (eligibility.eligible === true) {
            result = {
                eligible: true,
                teacherGrant: teacherGrant(inputData),
                classRoomGrant: classRoomGrant(inputData),
                libraryGrant: libraryGrant(inputData),
                washroomGrant: washroomGrant(inputData),
                waterGrant: waterGrant(inputData),
                wallGrant: grantForWall(inputData),
                hmRoomGrant: grantForHMroom(inputData),
                playgroundGrant: grantPlayGround(inputData),
                electricityGrant: grantElectricity(inputData),
            };
        } else {
            result = {
                eligible: eligibility.reason,
            };
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}