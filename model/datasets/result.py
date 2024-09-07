'''
Result= ODD if:
    Total Teachers * 40  > TotalStudents
    CWSN < 1 or CWSN not in record
    Separate Room for HM != 1
    Grade Configuration not in [(1,5),(1,10),(1,12),(6,10),(11,12)]
    School Type = 3 Co Educational and washroom < (1,1)
    Boundary Wall != 1
    Library Available != 1
    Drinking Water Available != 1
    Playground Available != 1
    Electricity Availability != 1
    Total Classrooms < Total Teachers
else:
    Result=Standard
'''