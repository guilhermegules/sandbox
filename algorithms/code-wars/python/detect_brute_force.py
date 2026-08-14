def detect_brute_force(logs):
    fail_count = dict()
    suspicious = set()

    for log in logs:
        ip, status, _ = log.split(" ", 2)

        if status == "LOGIN_FAIL":
            fail_count[ip] = fail_count.get(ip, 0) + 1
            if fail_count[ip] >= 3:
                suspicious.add(ip)

        elif status == "LOGIN_SUCCESS":
            fail_count[ip] = 0

    return sorted(suspicious)
