import datetime

def determine_time(arr):
    total_time = datetime.timedelta()
    for time in arr:
        (h, m, s) = time.split(':')
        total_time += datetime.timedelta(hours=int(h), minutes=int(m), seconds=int(s))
        
    total_seconds = total_time.total_seconds()
    total_hours = total_seconds / 3600    
    return total_hours <= 24
