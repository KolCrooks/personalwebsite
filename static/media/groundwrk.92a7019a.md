## About

Groundwrk was an app that I wrote with a friend that was aimed to tackle a couple of large problems at my highschool: there was no easy, accurate way to see GPA, and there was no way to see your current percent grade in a course (just the letter grade). We also wanted to use this platform to create a smart planner that designed a study plan based on your grades in a course, and information about when a test would be coming up, causing a guide to be created where you focussed more on the course that you were doing worse in.

## How it Worked

Our school used a system called powerschool to store our grades. Luckily this system has an api that you can use to access your grades. The one exception to this is that it requires a password to access it that is defined by the installation. Our school didn't change it from the default so I was still able to access it.

The user would sign into powerschool through our site, and then the server would use this sign in connection to fetch the grades. These grades would then be returned to the browser. The entire thing is written in nodejs with the server written with express and the front end written with Vue. This client was a PWA and could be added to your homescreen on your phone to act as an app.

The architecture of the whole app looks like this:

![Groundwrk Architecture](%architecture%)

The final version of the app looked like this:

![Groundwrk Home](%groundwrk_home%)
![Groundwrk Grades](%groundwrk_assignments%)

You could view your grades for specific assignment by tapping of the course.

## Statistics

In the lifespan of the app, we managed to gain 745 unique devices. This is amazing considering that the app only worked for my school of ~900 students.

![Groundwrk stats](%groundwrk_users%)

The app rapidly grew to a size where there were many people in the school that used the app, that had no idea who made it. It is especially amazing considering this was an app that we only shared with friends, and just happened to grow because it offered something that students wanted.

## Conclusion

Groundwrk rapidly grew over the 2 months or so that it was active. It was great for a while but were were asked by our school to shut it down as they thought that it would affect student mental health. While I disagreed with this, it was not worth hurting my company's relationship with them.

Overall this was an amazing experience and I am happy that we were able to create such a successful app in such a short time.

View Source code [here](https://github.com/KolCrooks/groundwrk)
