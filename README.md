# Description
Contest platform is a contest organized platform. There is three different role in this system normal-user, contest-creator, admin. In the homepage there is a popular section shows the most participated contest. All contest page implement in a tab view. All contest show by category. A contest details route show the detail informations about that contest. After click the participate button a user go to payment page if the payment is successful then the user register to the contest.

## User role
- Admin:
  - Manage registered users.
  - Manage contest: After a creator add a contest it is pending for admin approve. If admin accept then the contest publish otherwise admin can also delete.
    
- Creator:
  - Can add contests.
  - Edit his add contest before approve.
  - Select winner.

- User:
  - participate in a contest.
  - Payment through stripe.
  - Single participate in a contest.
  - Show wining percentege.
  - update his/her profile.

# Project Features
- Different user role: There are three different user roles. Every user have different dashboard options.
- Payment Method: In this sytem for payment stripe payment method is implemented.
- Single time participate: A user can participate a contest one time only after that the participate button disable.
- Contest pending: After create a contest by the creator the post is waiting for admin approval.
- Profile update: A user can update his profile picture and name using his dashboard.

# Technology
- React
- Material UI
- Mongodb
- Firebase
- Node js
- Express js

# Site Link
Live site link: https://contest-platform-d76ed.web.app/
