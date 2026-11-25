"""Upcoming sky events (full/new moons with zodiac sign, Mercury retrograde, solstices/equinoxes).
Usage: python3 tools/sky_events.py [days=60]   — tropical zodiac, dates in UTC."""
import sys, math, datetime as dt, ephem
SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]
MOON_NAMES = {1:"Wolf",2:"Snow",3:"Worm",4:"Pink",5:"Flower",6:"Strawberry",7:"Buck",8:"Sturgeon",9:"Harvest/Corn",10:"Hunter's",11:"Beaver",12:"Cold"}
def sign_of(body, date):
    b = body(); b.compute(date, epoch=date)
    lon = math.degrees(ephem.Ecliptic(b, epoch=date).lon)
    return SIGNS[int(lon // 30)], lon % 30
days = int(sys.argv[1]) if len(sys.argv) > 1 else 60
now = ephem.now(); end = ephem.Date(now + days)
ev = []
d = now
while True:
    d = ephem.next_full_moon(d)
    if d > end: break
    s, deg = sign_of(ephem.Moon, d); m = d.datetime().month
    ev.append((d, f"FULL MOON ({MOON_NAMES[m]} Moon) in {s} {deg:.0f}°"))
d = now
while True:
    d = ephem.next_new_moon(d)
    if d > end: break
    s, deg = sign_of(ephem.Moon, d); ev.append((d, f"NEW MOON in {s} {deg:.0f}°"))
for f, n in [(ephem.next_solstice, "SOLSTICE"), (ephem.next_equinox, "EQUINOX")]:
    d = f(now)
    if d <= end: ev.append((d, n))
# Mercury retrograde: sign change of daily longitude motion
prev = None; t = ephem.Date(now)
while t < end:
    _, _ = 0, 0
    m = ephem.Mercury(); m.compute(t, epoch=t); lon = math.degrees(ephem.Ecliptic(m, epoch=t).lon)
    if prev is not None:
        mv = (lon - prev + 540) % 360 - 180
        state = "R" if mv < 0 else "D"
        if hasattr(sys, "_st") and sys._st != state:
            s, deg = sign_of(ephem.Mercury, t)
            ev.append((t, f"MERCURY {'RETROGRADE begins' if state=='R' else 'goes DIRECT'} in {s} {deg:.0f}°"))
        sys._st = state
    prev = lon; t = ephem.Date(t + 1)
for d, txt in sorted(ev): print(d.datetime().strftime("%Y-%m-%d %H:%M UTC"), "·", txt)
