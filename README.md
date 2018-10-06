- Make the UI aware that a user is currently authenticated
  - Not working properly - handling asyncronicity in verify auth and passing locals to template?

- Allow a currently authenticated user to log themselves out
  - Needs testing

- Use bootstrap styling to make shit pretty
  - Use bulma

TODO:
- Show list of other users that have logged in
- Post to message board
- Support annoymous messages
- Support messages for users that are logged in.
  - Messages for user that are logged in should show their information
- Authentication stuff
  - I would like the system to tell me when my registration was successful
  - I would like the system to tell me when my registration is not successful
    - This needs testing

PUG STUFF:
- re-useable includes
  - single registerFriend.pug form that renders placeholder or user-entered username/email!

- Need a success page

- I would like the system to tell me when my registration is not successful
	- This is the next step!

BUGFIXES PLZ
  - i can register with the same account twice
    - not anymore!
  - I CAN SIGN UP WITHOUT A FIRST NAME
    - no more first name, just email
  - I CAN SIGN UP WITHOUT A LAST NAME
    - no more last name, just email
  - I CAN SIGN UP WITHOUT A PASSWORD?!
    - not anymore!
  - I CAN SIGN UP WITHOUT A USERNAME?!
    - not anymore!
